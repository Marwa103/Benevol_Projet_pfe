
package com.benevol.dto.aidrequest;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;

public class CreateAidRequestDto {

    @NotBlank(message = "Le commentaire est obligatoire")
    @Size(min = 10, max = 1000, message = "Le commentaire doit contenir entre 10 et 1000 caractères")
    private String commentaire;

    @NotNull(message = "Les articles sont obligatoires")
    @Size(min = 1, message = "Au moins un article doit être demandé")
    private List<CreateAidRequestItemDto> items;

    // Constructeurs
    public CreateAidRequestDto() {}

    // Getters et Setters
    public String getCommentaire() { return commentaire; }
    public void setCommentaire(String commentaire) { this.commentaire = commentaire; }

    public List<CreateAidRequestItemDto> getItems() { return items; }
    public void setItems(List<CreateAidRequestItemDto> items) { this.items = items; }
}
