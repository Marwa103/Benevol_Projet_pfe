
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Coins, TrendingUp, Wallet, ChevronRight } from 'lucide-react';
import { 
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

interface Donation {
  id: string;
  donorName: string;
  amount: number;
  date: string;
  type: 'MONETARY' | 'MATERIAL';
  items?: { name: string; quantity: number }[];
}

interface DonationsTabProps {
  donations: Donation[];
  isLoading: boolean;
  totalMonetary: number;
}

// Enhanced data for the chart with better visuals
const donationTrends = [
  { name: 'Jan', monetary: 10000, material: 5000 },
  { name: 'Feb', monetary: 15000, material: 7000 },
  { name: 'Mar', monetary: 20000, material: 18000 },
  { name: 'Apr', monetary: 35000, material: 40000 },
  { name: 'May', monetary: 45000, material: 30000 },
  { name: 'Jun', monetary: 60000, material: 40000 },
];

const DonationsTab: React.FC<DonationsTabProps> = ({ 
  donations, 
  isLoading,
  totalMonetary
}) => {
  return (
    <div className="space-y-6">
      {/* Header Cards with improved aesthetics */}
      <div className="grid grid-cols-1 gap-6">
        <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader className="pb-2 bg-white/30 backdrop-blur-sm border-b border-blue-100">
            <CardTitle className="text-lg text-indigo-800 flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-sm">
                <Coins className="h-5 w-5 text-white" />
              </div>
              Dons Monétaires
            </CardTitle>
            <CardDescription className="text-indigo-700/70">
              Total des contributions financières
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-3xl font-bold text-indigo-800 mb-1">
              {totalMonetary.toLocaleString()} MAD
            </div>
            <div className="flex items-center text-indigo-600 text-sm gap-1.5 mb-3">
              <div className="bg-green-500/10 p-1 rounded-full">
                <TrendingUp className="h-3 w-3 text-green-600" />
              </div>
              <span>+18% depuis le mois dernier</span>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-center mt-4 text-xs font-medium">
              <div className="bg-indigo-100 rounded-lg p-2 text-indigo-700">
                <div className="text-lg font-bold">23</div>
                <div>Donateurs</div>
              </div>
              <div className="bg-indigo-100 rounded-lg p-2 text-indigo-700">
                <div className="text-lg font-bold">12</div>
                <div>Ce mois</div>
              </div>
              <div className="bg-indigo-100 rounded-lg p-2 text-indigo-700">
                <div className="text-lg font-bold">5</div>
                <div>Récurrents</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Donation trend chart with enhanced visuals */}
      <Card className="border-0 shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-100 border-b">
          <CardTitle className="text-gray-800 flex items-center gap-2">
            <Wallet className="h-5 w-5 text-indigo-600" />
            Évolution des dons
          </CardTitle>
          <CardDescription>
            Tendances des dons monétaires et matériels (valeur estimée)
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 bg-white">
          <div className="h-[350px]">
            <ChartContainer
              config={{
                monetary: {
                  label: "Dons monétaires",
                  color: "#4F46E5"
                },
                material: {
                  label: "Dons matériels (valeur)",
                  color: "#10B981"
                }
              }}
            >
              <AreaChart
                data={donationTrends}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <defs>
                  <linearGradient id="monetaryGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="materialGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="name"
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
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-md">
                          <p className="font-medium text-gray-700">{payload[0].payload.name}</p>
                          {payload.map((entry, index) => (
                            <p key={index} className="text-sm" style={{ color: entry.color }}>
                              <span className="font-medium">{entry.name}:</span> {Number(entry.value).toLocaleString()} MAD
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend 
                  iconType="circle" 
                  verticalAlign="top" 
                  height={36}
                  wrapperStyle={{ paddingBottom: "10px" }}
                />
                <Area 
                  type="monotone" 
                  dataKey="monetary" 
                  name="Dons monétaires" 
                  stroke="#4F46E5" 
                  fillOpacity={1}
                  fill="url(#monetaryGradient)" 
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="material" 
                  name="Dons matériels (valeur)" 
                  stroke="#10B981" 
                  fillOpacity={1}
                  fill="url(#materialGradient)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Donations table with improved styling */}
      <Card className="border-0 shadow-md overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between border-b bg-gradient-to-r from-gray-50 to-slate-100">
          <div>
            <CardTitle className="text-gray-800 flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-purple-100">
                <Coins className="h-4 w-4 text-purple-700" />
              </div>
              Dons reçus
            </CardTitle>
            <CardDescription>
              Liste des dons monétaires et matériels
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-sm text-muted-foreground">Chargement des dons...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50 border-b">
                  <TableRow>
                    <TableHead className="font-medium text-slate-700">Donateur</TableHead>
                    <TableHead className="font-medium text-slate-700">Date</TableHead>
                    <TableHead className="font-medium text-slate-700">Type</TableHead>
                    <TableHead className="font-medium text-slate-700">Détails</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {donations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-12 text-muted-foreground">
                        Aucun don enregistré
                      </TableCell>
                    </TableRow>
                  ) : (
                    donations.map(donation => (
                      <TableRow key={donation.id} className="hover:bg-gray-50 border-b last:border-0">
                        <TableCell className="font-medium text-slate-800">{donation.donorName}</TableCell>
                        <TableCell className="text-slate-600">{donation.date}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                            donation.type === 'MONETARY' 
                              ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {donation.type === 'MONETARY' ? 'Monétaire' : 'Matériel'}
                          </span>
                        </TableCell>
                        <TableCell>
                          {donation.type === 'MONETARY' ? (
                            <span className="font-semibold text-indigo-700">{donation.amount.toLocaleString()} MAD</span>
                          ) : (
                            <div className="space-y-1">
                              {donation.items?.map((item, index) => (
                                <div key={index} className="text-sm bg-gray-50 rounded px-2 py-1 inline-block mr-2 mb-1">
                                  <span className="font-medium text-slate-700">{item.name}:</span> {item.quantity} unités
                                </div>
                              ))}
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
          {/* <div className="p-4 border-t bg-slate-50">
            <Button variant="outline" className="w-full bg-white hover:bg-slate-100 border border-slate-200 shadow-sm">
              Voir tous les dons
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default DonationsTab;
