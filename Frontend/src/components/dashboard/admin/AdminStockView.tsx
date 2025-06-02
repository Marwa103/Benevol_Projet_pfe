
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Package, AlertTriangle } from 'lucide-react';
import { StockItem } from '@/utils/types';
import { useQuery } from '@tanstack/react-query';
import { getAdminStockItems } from '@/services/adminService';

interface AdminStockViewProps {
  className?: string;
}

const AdminStockView: React.FC<AdminStockViewProps> = ({ className }) => {
  const { 
    data: stockItems = [], 
    isLoading 
  } = useQuery({
    queryKey: ['adminStock'],
    queryFn: getAdminStockItems,
    refetchInterval: 60000
  });

  const lowStockItems = stockItems.filter(item => item.quantity < item.threshold);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Gestion des Stocks</CardTitle>
        <CardDescription>
          Aperçu des articles disponibles et articles en stock faible
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
            {/* Section des articles en stock faible */}
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                Articles en stock faible ({lowStockItems.length})
              </h3>
              
              {lowStockItems.length === 0 ? (
                <p className="text-sm text-muted-foreground">Aucun article en stock faible pour le moment.</p>
              ) : (
                <div className="space-y-2">
                  {lowStockItems.slice(0, 3).map(item => (
                    <div key={item.id} className="space-y-1">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.name}</span>
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                            Critique
                          </span>
                        </div>
                        <span className="text-sm">
                          {item.quantity} / {item.threshold} {item.unit}
                        </span>
                      </div>
                      <Progress 
                        value={(item.quantity / item.threshold) * 100} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Table des stocks */}
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Package className="h-5 w-5 mr-2 text-primary" />
                État du stock global
              </h3>
              
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Article</TableHead>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>Quantité</TableHead>
                      <TableHead>État</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stockItems.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                          Aucun article en stock
                        </TableCell>
                      </TableRow>
                    ) : (
                      stockItems.slice(0, 5).map(item => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>
                            {item.quantity} {item.unit}
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              item.quantity < item.threshold 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {item.quantity < item.threshold ? 'Stock faible' : 'Suffisant'}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminStockView;
