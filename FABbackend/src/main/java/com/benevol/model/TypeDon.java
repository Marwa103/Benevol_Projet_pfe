
package com.benevol.model;

public enum TypeDon {
    MONETARY("Don monétaire"),
    MATERIAL("Don matériel");

    private final String displayName;

    TypeDon(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
