
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data for statistics charts
const monthlyStats = [
  { month: 'Jan', associations: 5, aidRequests: 12, donations: 8000 },
  { month: 'Fev', associations: 8, aidRequests: 18, donations: 12000 },
  { month: 'Mar', associations: 10, aidRequests: 15, donations: 15000 },
  { month: 'Avr', associations: 12, aidRequests: 22, donations: 25000 },
  { month: 'Mai', associations: 15, aidRequests: 30, donations: 20000 },
  { month: 'Jun', associations: 20, aidRequests: 25, donations: 30000 },
];

interface AdminStatisticsViewProps {
  className?: string;
}

const AdminStatisticsView: React.FC<AdminStatisticsViewProps> = ({ className }) => {
  return (
    <div className={className}>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl">Évolution mensuelle</CardTitle>
          <CardDescription>
            Croissance des associations et activités
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={monthlyStats}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="associations" name="Nouvelles Associations" fill="#8884d8" />
              <Bar yAxisId="left" dataKey="aidRequests" name="Demandes d'Aide" fill="#82ca9d" />
              <Bar yAxisId="right" dataKey="donations" name="Dons (DH)" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStatisticsView;
