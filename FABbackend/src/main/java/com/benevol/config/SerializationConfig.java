package com.benevol.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.benevol.model.TypeDon;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.core.JsonProcessingException;
import java.io.IOException;
import java.math.BigDecimal;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class SerializationConfig {

    @Bean
    @Primary
    public ObjectMapper objectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();

        // Configurer la sérialisation des dates
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        // Ajouter le module pour la désérialisation personnalisée
        SimpleModule customModule = new SimpleModule();

        // Ajouter le désérialiseur pour TypeDon (chaîne de caractères -> enum)
        customModule.addDeserializer(TypeDon.class, new TypeDonDeserializer());

        // Ajouter le désérialiseur pour BigDecimal (number -> BigDecimal)
        customModule.addDeserializer(BigDecimal.class, new BigDecimalDeserializer());

        objectMapper.registerModule(customModule);

        // Configurer l'ObjectMapper pour être plus flexible
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        return objectMapper;
    }

    // Désérialiseur personnalisé pour TypeDon
    private static class TypeDonDeserializer extends JsonDeserializer<TypeDon> {
        @Override
        public TypeDon deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JsonProcessingException {
            String value = p.getValueAsString();
            if (value == null || value.isEmpty()) {
                return null;
            }
            try {
                return TypeDon.valueOf(value);
            } catch (IllegalArgumentException e) {
                // Gérer le cas où la valeur ne correspond pas exactement à l'enum
                if ("MONETARY".equalsIgnoreCase(value)) {
                    return TypeDon.MONETARY;
                } else if ("MATERIAL".equalsIgnoreCase(value)) {
                    return TypeDon.MATERIAL;
                }
                throw new IOException("Valeur invalide pour TypeDon: " + value, e);
            }
        }
    }

    // Désérialiseur personnalisé pour BigDecimal
    private static class BigDecimalDeserializer extends JsonDeserializer<BigDecimal> {
        @Override
        public BigDecimal deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JsonProcessingException {
            if (p.getCurrentToken().isNumeric()) {
                return new BigDecimal(p.getValueAsDouble());
            } else {
                String value = p.getValueAsString();
                if (value == null || value.isEmpty()) {
                    return BigDecimal.ZERO;
                }
                try {
                    return new BigDecimal(value);
                } catch (NumberFormatException e) {
                    throw new IOException("Valeur invalide pour BigDecimal: " + value, e);
                }
            }
        }
    }
}