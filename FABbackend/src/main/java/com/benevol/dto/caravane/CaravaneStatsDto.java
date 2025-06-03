package com.benevol.dto.caravane;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CaravaneStatsDto {
    private long nbActives;
    private long nbPlanifiees;
    private long nbTerminees;
    private long nbParticipations;
}

