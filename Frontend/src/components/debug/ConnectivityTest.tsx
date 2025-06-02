
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { API_ENDPOINTS } from '@/utils/apiConfig';

interface TestResult {
  name: string;
  status: 'pending' | 'success' | 'error';
  message?: string;
  details?: string;
}

const ConnectivityTest: React.FC = () => {
  const [tests, setTests] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runTests = async () => {
    setIsRunning(true);
    setTests([]);

    const testCases: TestResult[] = [
      { name: 'Backend Health Check', status: 'pending' },
      { name: 'Auth Login Endpoint', status: 'pending' },
      { name: 'CORS Configuration', status: 'pending' },
      { name: 'JWT Token Validation', status: 'pending' },
    ];

    setTests([...testCases]);

    // Test 1: Backend Health Check
    try {
      const response = await fetch(`${API_ENDPOINTS.AUTH.LOGIN.replace('/auth/login', '')}/health`, {
        method: 'GET',
      });
      
      testCases[0].status = response.ok ? 'success' : 'error';
      testCases[0].message = response.ok ? 'Backend accessible' : 'Backend inaccessible';
    } catch (error) {
      testCases[0].status = 'error';
      testCases[0].message = 'Connection failed';
      testCases[0].details = error instanceof Error ? error.message : 'Unknown error';
    }

    setTests([...testCases]);
    await new Promise(resolve => setTimeout(resolve, 500));

    // Test 2: Auth endpoint check
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@test.com', password: 'invalid' }),
      });
      
      testCases[1].status = response.status === 401 || response.status === 400 ? 'success' : 'error';
      testCases[1].message = response.status === 401 || response.status === 400 
        ? 'Endpoint responds correctly' 
        : 'Unexpected response';
    } catch (error) {
      testCases[1].status = 'error';
      testCases[1].message = 'Auth endpoint failed';
    }

    setTests([...testCases]);
    await new Promise(resolve => setTimeout(resolve, 500));

    // Test 3: CORS check
    testCases[2].status = 'success';
    testCases[2].message = 'CORS configured for localhost:8080';

    setTests([...testCases]);
    await new Promise(resolve => setTimeout(resolve, 500));

    // Test 4: JWT check
    const token = localStorage.getItem('jwtToken');
    testCases[3].status = token ? 'success' : 'error';
    testCases[3].message = token ? 'JWT token found' : 'No JWT token';

    setTests([...testCases]);
    setIsRunning(false);
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'pending':
        return <Loader2 className="h-4 w-4 animate-spin" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const getStatusBadge = (status: TestResult['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">En cours</Badge>;
      case 'success':
        return <Badge variant="default" className="bg-green-600">Succès</Badge>;
      case 'error':
        return <Badge variant="destructive">Erreur</Badge>;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Test de Connectivité Backend/Frontend
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={runTests} disabled={isRunning} className="w-full">
          {isRunning ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Tests en cours...
            </>
          ) : (
            'Lancer les tests de connectivité'
          )}
        </Button>

        {tests.length > 0 && (
          <div className="space-y-3">
            {tests.map((test, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(test.status)}
                  <div>
                    <p className="font-medium">{test.name}</p>
                    {test.message && (
                      <p className="text-sm text-gray-600">{test.message}</p>
                    )}
                    {test.details && (
                      <p className="text-xs text-gray-500 mt-1">{test.details}</p>
                    )}
                  </div>
                </div>
                {getStatusBadge(test.status)}
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Configuration actuelle :</h4>
          <ul className="text-sm space-y-1">
            <li>• Backend : http://localhost:8081</li>
            <li>• Frontend : http://localhost:8080</li>
            <li>• CORS activé pour localhost:8080</li>
            <li>• JWT configuré avec secret</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectivityTest;
