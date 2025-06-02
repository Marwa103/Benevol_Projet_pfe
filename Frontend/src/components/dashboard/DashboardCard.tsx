
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
  className,
}) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <h4 className="text-2xl font-bold">{value}</h4>
            {trend && (
              <div className="flex items-center mt-1">
                <span className={cn(
                  "text-sm font-medium flex items-center",
                  trend.isPositive ? "text-green-500" : "text-red-500"
                )}>
                  {trend.isPositive ? (
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="mr-1 h-4 w-4" />
                  )}
                  {trend.value}%
                </span>
                <span className="text-xs text-muted-foreground ml-2">vs dernier mois</span>
              </div>
            )}
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          {icon && (
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
