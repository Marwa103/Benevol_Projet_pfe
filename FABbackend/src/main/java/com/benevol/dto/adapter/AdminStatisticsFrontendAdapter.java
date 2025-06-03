package com.benevol.dto.adapter;

import com.benevol.dto.admin.AdminStatisticsDto;
import java.util.HashMap;
import java.util.Map;


public class AdminStatisticsFrontendAdapter {

    public static Map<String, Object> adapt(AdminStatisticsDto adminStats) {
        Map<String, Object> frontendStats = new HashMap<>();
        

        frontendStats.put("totalAssociations", adminStats.getTotalAssociations());
        frontendStats.put("pendingRequests", adminStats.getPendingRequests()); 
        frontendStats.put("totalDonations", adminStats.getTotalDonations());
        frontendStats.put("pendingHelpRequests", adminStats.getPendingHelpRequests());
        
        return frontendStats;
    }
}
