
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Heart, ArrowUpRight, ChevronRight, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getAdminDonations } from '@/services/adminService';
import { formatDate } from '@/utils/dateFormat';
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from 'recharts';

interface AdminDonationsViewProps {
  className?: string;
}

// Enhanced data for the chart with better aesthetics
const donationData = [
  { month: 'Jan', amount: 15000, color: '#8B5CF6' },
  { month: 'Feb', amount: 22000, color: '#7E69AB' },
  { month: 'Mar', amount: 38000, color: '#6366F1' },
  { month: 'Apr', amount: 75000, color: '#4F46E5' },
];

const colors = ['#8B5CF6', '#7E69AB', '#6366F1', '#4F46E5'];

const AdminDonationsView: React.FC<AdminDonationsViewProps> = ({ className }) => {
  const { 
    data: donations = [], 
    isLoading 
  } = useQuery({
    queryKey: ['adminDonations'],
    queryFn: getAdminDonations,
    refetchInterval: 60000
  });

  console.log(donations);
  const totalDonations = donations.reduce((sum, donation) => sum + donation.montant, 0);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Gestion des Dons</CardTitle>
        <CardDescription>
          Suivi des dons reçus et des transactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-sm text-muted-foreground">Chargement des données...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Résumé des dons */}
            <div className="rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-sm border border-blue-100">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-red-400 to-pink-500 p-3 rounded-xl shadow-md">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700">Total des dons</h3>
                    <p className="text-2xl font-bold text-indigo-700">{totalDonations} MAD</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:justify-end">
                  <Button variant="outline" size="sm" className="bg-white shadow-sm border-blue-100 hover:bg-blue-50">
                    Exporter <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Graphique d'évolution des dons amélioré */}
            <Card className="border shadow-md overflow-hidden bg-white">
              <CardHeader className="pb-2 bg-gradient-to-r from-indigo-50 to-purple-50 border-b">
                <CardTitle className="text-lg flex items-center text-indigo-700">
                  <TrendingUp className="mr-2 h-5 w-5 text-indigo-500" />
                  Évolution des dons (MAD)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ChartContainer 
                  className="h-[350px] w-full"
                  config={{
                    amount: {
                      label: "Montant des dons",
                      color: "#8B5CF6"
                    }
                  }}
                >
                  <BarChart
                    data={donationData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 20,
                    }}
                  >
                    <defs>
                      <linearGradient id="donationGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity={1}/>
                        <stop offset="100%" stopColor="#C4B5FD" stopOpacity={0.8}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={{ stroke: '#9CA3AF' }} 
                      tickLine={false}
                      tick={{ fill: '#4B5563', fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={{ stroke: '#9CA3AF' }}
                      tickLine={false}
                      tick={{ fill: '#4B5563', fontSize: 12 }}
                      tickFormatter={(value) => `${value.toLocaleString()} MAD`}
                      dx={-10}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-md">
                              <p className="font-medium text-gray-700">{payload[0].payload.month}</p>
                              <p className="text-lg font-bold text-indigo-600">
                                {Number(payload[0].value).toLocaleString()} MAD
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar 
                      dataKey="amount" 
                      name="Montant (MAD)" 
                      radius={[8, 8, 0, 0]}
                    >
                      {donationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`url(#donationGradient)`} />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
                
                {/* Légende personnalisée */}
                <div className="flex flex-wrap justify-center mt-4 gap-4">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 mr-2"></div>
                    <span className="text-sm text-gray-600">Montant des dons (MAD)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Historique des dons récents */}
            <div>
              <h3 className="text-lg font-medium mb-4 text-gray-800">Dons récents</h3>
              
              <div className="rounded-lg border shadow-sm overflow-hidden">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow className="hover:bg-gray-50">
                      <TableHead>Date</TableHead>
                      <TableHead>Donateur</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {donations.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                          Aucun don enregistré
                        </TableCell>
                      </TableRow>
                    ) : (
                      donations.map(donation => (
                        <TableRow key={donation.id} className="hover:bg-gray-50">
                          <TableCell>{formatDate(donation.dateCreation)}</TableCell>
                          <TableCell className="font-medium">{donation.nomDonateur}</TableCell>
                          <TableCell className="font-semibold text-indigo-700">
                            {donation.montant} MAD
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                              donation.status === 'completed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {donation.status === 'completed' ? 'Complété' : 'En attente'}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
                {/* <div className="p-3 border-t bg-gray-50">
                  <Button variant="ghost" size="sm" className="w-full hover:bg-gray-100">
                    Voir tous les dons <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div> */}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminDonationsView;
