
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Phone, Mail } from 'lucide-react';
import { Association } from '@/utils/types';

interface AssociationCardProps {
  association: Association;
}

const AssociationCard: React.FC<AssociationCardProps> = ({ association }) => {
  const defaultLogo = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAPDxAQEBAQEA8NEBAQDhAPEA8PEA8PFREWFhUSFRUYHSghGCYnHRYXIzEiJSkrLjAuFx8zODUtNygtLisBCgoKDg0OGxAQGi0lHyUtLS0yLSstLS0tLS0tLS0rLy8tLS0xLy8rLS0rLS0tLS0tLS0tLSstLS0tLS0tLS0tLf/AABEIALcBEwMBEQACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAwIEBQYHAQj/xABEEAACAgACBQcHCQcEAwEAAAABAgADBBEFBhIhMRNBUWFxgbEiMlJykaHRBxQVQlNik7LBIyQlM3OS4UOCovBjo8I0/8QAGwEBAAIDAQEAAAAAAAAAAAAAAAIGAQMFBAf/xAA1EQACAQICBQoFBQEBAAAAAAAAAQIDEQQFEiExcZETMkFRUmGBobHBBhQi0eEkMzRC8CPi/9oADAMBAAIRAxEAPwDuMAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEApZwASSABxJ3ATDaSuzKTepGGxWs2HQ5AtYR9muY9pyE5dbOcNTdk77j308trzV2rbyBdbqM96WgdOSHwM0xz3Dt2afl9zY8orJamvP7GXwOkqbxnW4bLiODDtB3zp0MVSrq9OV/XgeGth6lF2mrF3PQaRAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEApscKCScgBmSeYdMxKSirsyk27I0HTmmWxLEAkUg+Svpfeb4Sl5hmMsTK0dUerr72WfB4KNCN3zv8AbDFTmHuPCZkye1XMjBlYqy7ww3ETZTqShJSi7MxOEZx0ZK6N81c0z85QhshbXltgcGHMwlyy7HLEw185bfuVfHYN4eermvZ9jMzonhEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAottVAWYhQOJJyEhUqQpx0puyBib9YKwckVn6/NHxnBr/ENGDtTi5eSJqBEmsPTXu6m/wATyx+Jdf1U+D/BnQMlg9JV27gcm9Ftx7umdjB5rh8T9MXaXU/boZFxaLydMiIAgCAIBgdcMSUw+wP9Vgp9UDM/pOPnVZww+iv7Ox0srpadbSfQrmkSnlkKSZkyeEzJkpJgyZDV/FGrFVHmZhW3WG3eOU6GW1uSxEX16uJ5cdR5ShJdWvgdKEuxUBAEAQBAIMZjK6UL2uqIOJY5dw6ZKEJTdoq7NVWtClHSm7I1PHa/0qSKqns+8xFYPdvPhOhDLZvnO3mcarntNO1OLe/UWlXyi7/Lwxy+5ZmfeJOWWdUvI1wz13+qHB/g2bQusuGxfk1vlZz1Pkr93Me7OeKthqlLnLV1nVw2Po4jVF6+pmYnnPaIAgCAIAgCAIAgCAU22BVLE5BQST0ASE5qEXKWxA0jSmk2vfM5hAfIXoHSeuUPMcdPFVLvmrYv90k1qLVWnNaJ3JFaRaM3JFeYV07mTZdCaR5QbDeeozB9JZdMlzN148lU5y6etfdGqcbazLSwEBAEAQDWNeFOxSeYOwPeu7wnAz9Pk4PvZ2Mna05LuNPJlXO+eTJIpJmQUkzJIm0eCb6QOJtr/OJ6MKr1oLvXqasQ0qUm+p+h1aXwpIgCAIBBjsUlNT2uckrUsx6pKEHOSitrNdWrGlBzlsRyLTumrMXaXckKCeTTPyUX49JljoUI0Y2XHrKRi8VPE1HKWzoXUYlnm486REzwTSKVuKkMpKspzVlORUjgQeaYaurM2RundHVtRNZTjKzXaR84pA2jw5ROAfL3H/M4WMw3JS0o7H5Fqy7GOtHRlzl5m1zxHSEAQBAEAQBAEAQDCa24gphwo/1HCnsG8+E42eVXHD6K/s7eG0GnBpTLE7latI2BIrSNiVytWkWjNy80diNi1G6GAPYdxnqwNV0cRCa6/J6g9hu0+kGkQBAEAx+ncB84odB53nJ6w4fDvnjx2G+YouC29G89OEr8jVUns6dxzdgQSDmCDkQeII4iUZxadmW9NNXRSTMEikmSMlJMykDYNStHGy7lmHkU57J9Kwj9B+k7eT4Vzqcq9i9TkZtiVCnya2v0/Jv0tBWxAEAQDTPlNxhSiqoHLlnJbrVBw9pHsnSy2F5uXV7nDzyq1TjBdL9DmrNOyVpIjZoJpEbNMEkiMtBNIzGpmPNGPwzDg9gqYdK2eT4kHunnxUNOjJePA9uBnydaL77cdR3ASulsPYAgCAIAgCAIAgGua6oeRrbmWzf3qZws9g3Ri+/2BqAaVOwuVhpGxK5IrSLRkrDSNjNy4wg2nQDiXUe8Tbh4aVWMV0teoudAn0o1iAIB5nAEA1/T+ry3k2VkJbz5+bZ29B65yMwyyNd6cNUvJnTwOYSo/RLXHzRpuMwF1J8tCOsZMp7xK1WwtSi/rRYaWIpVeay1VGY5KCSeYAmaoxcnZG5yUVdszmidV7bSDaeSr5xmDY3UBzd862EyqdR3qOy8zmYnNKdNWp/U/I3rCYZKUWutQqKMgB/3fLPTpxpxUYKyRW6lSVSTlN3bJ85sICAIAgGgfKrUdnDWcwNiHtIBHgZ1MslrktxwM7g3oS3r0OdM06xwUihmgmkRs0EkiMtBKxkNW6jZjsIo3k4io9yuGPuBmmu7UpPuZ6cNFurG3WjvwlbLaewBAEAQBAEAQBALTSmDF9L1ndtDyT0MN4PtnnxdBV6Uqb6fXoBza6pq3ZHGyyHJh1yiVaUqcnGS1oieK01NGbkgaRsSuVhpixm5sGq+CLPyzDJK89kngX/xO5kmD0qnLyWqOzf+Be5ncVpvD17mtUkcyZufdLDVzHDUtUpq/dr9D0U8HXnsjx1GLv1tQeZWzdbEKPdnObVz+muZFvfq+57YZRN8+SW7WY+7WrEHzRWncWPvnhnnteXNSXmeqGVUVtbZZW6bxLcbmHUuyvgJ455pipf3Z6I4HDx/oWz4y1vOtsPa7H9Z5pYmtLbN8Wb40acdkVwISSec+0zU5N7TYklsPJi4sIMiLmCtLmHBmHYxEmqs1sk+JFwi9qRcV6UxC8LrO9i3jPRDH4mGyb43NUsLRltgi8p1jxS/XVvWQfplPVDOcVHbK+9HnlltB9FtzL6jW5vr1A9aMR7jPbT+IJf3hwPNPKF/WXEyWG1mw7ecWrP313e0ZzoUs6w0+c2t6+x46mWV47LPcU6xYKvSGEsrrdGbIPUQQcrF3jPoz3jvnZwWLpqanBpruOPj8HOpScJKz6L9ZxXEIyMyMCroSrKdxUjiDLOmmroqDg4uzIGaZMpFDNBJIoLQSSOhfJToBmsONsGSIGTD5/WY7mcdQG7vPROXmFdW5NeJ2Mtwzvyj8DqU5J2hAEAQBAEAQBAEAQDE6a0FXihn5lqjJXAzzHQw5xOfjcup4lXeqXX9zDRqWK1exVZ/l8oPSrO17uMrdbKsRTeqN13GLMxmKPInK39mSMwHBBy7J4p4erF2cWhpJbSwt03WvBXbrAAHvko4ST2tGYVqSf1ptdxHidbHYBSjFRuC7YVQOpQMp65Uak0ouepdHQe2GcUqXMo+f4LUazgcaW/2up/QTX8g+iXkbV8Qx/tTfg1+C5w+smHbcxas/fXd7RnNc8BVWyz3Hqo57hJ6pNx3r3V0ZWq1XAZWDKeBUgieSUHF2Z1oVIVFpQd13FcgbBAEAQBAEAQBAEzYwY7Habw1G57RtD6i+W3eBw751sHkeOxa0qdN263qXn7HhxGZ4ahqnLX1LWzE2651fUqsb1iqfGd6l8GYh/uVYrcm/scmp8SUVzYN8F9yivXQg5rQR0EW5H2hZ6o/Bco61iLPuj/6PLL4mT1Olq3/AIIdKawJijt2VutoGW2CrFugNuGfbO5l+XY/CPRdZTh1NNNbnr4M4mPxGCxS0lTcJ9ad0961cUYwWgztaLOE4NGUw2rmOty2MLcwYZhtjZUg8+0d00SxFKO2SPRDC1ZbIs3HVz5M2LCzHMAo38hWcy3U78w6h7Z4a+YK1qfE6OHy17anA6ZRSqKqKoVUACqoyCgcABOU227s7CSSsiSYMiAIAgCAIAgCAIAgFppHSNWHTbtcKOYcWY9AHPNFfEU6MdKbFzRNOa43W5rRnTWd20P5pHb9Xu9s4OIzWc9VPUvM1uT6DULVJJJJJO8knMk9ZnO023dmtotnrk1Ig0W71zYmQaLeyubFI1tFtZXNqka3E9wN11Vg5Da22OQrUFuUPRsDjJSpxrLRkr+pLD4ithp6VF2fV0PwOjLhcQlVb4ilqGsHmsVORHYd3Yd84+MwVTDv6lqexl7wOMWJp3atLpX+6CmeE9wgCAIAgCAeqpJAAzJIAA4knmkoxcnZbTDaSuzVte7Mfh25J6bMPS24WjIi7q21OS9nGfRsgyHDU4qrWtKp1PZHw6X37F0FPzXNasm4U9Uevpf4/wAzSkSXIrTZMqQQbJUSDW2TKkGtslVJgg2ZnQWnsVgmzotYL9atvKqbtU8O0ZGaa2Gp1V9S8ek2UsVUpO8WdQ1a18oxWVd2WHuO4bR/ZOfutzdh984uIwE6euOteZ2cNmVOpqnqfkbeDPAdI9gCAIAgCAIAgCAIBhNPafXDgomT3dH1U62+E5OPzOGH+iOuXpvM2NCx173OXsYsx5zzDoA5pV6tedWWlN3ZFosnSRTI2IHrmxMjYt7K5sTINED1zYmRaLd65NMg0R1YN7XWutSz2MFRRzsZvppyaSION9R2LU/VKnAIGID4lh+0tI4fcToHjLDh8OqS7z1UqKhr6TNaTwS31NW3OPJPotzGMVh44ik6b/zPZh6zo1FNHOHQqSpGTKSCOsHIyhTg4ScXtRbYyUkmuk8kCQgCAIAgGyanaPDM1zDdX5Nfrc57h4yw5HhFKTrS6NS3nHzXEaKVJdOt7jaMZhK7q2rtRbK3GTI4DKw6xLVGTi7xdmcFxTVmcO1/1LOjrBZVm2EuJCE7zU/Hk2PP1Hq6t/fwWL5ZWlzl5nGxdDkndbDVVSe88DkSqsGtslVIINkypMGtslVYINkipBBs3HVTXG3DFa7ybcPwBO+yr1TzjqPdOfisDGp9UNUvU6WDzOVJqM9cfNf7qOo4PF13ItlbB0cZqynMGcKcJQejJWZZadSNSKlB3TJ5EmIAgCAIAgCAYXWDS3JDk6z+0Ybz6A6e2cTNszWHXJU+c/L8kkrml2KSSTvJ3kneSekyoabbuyVi3dJNMjYhdJNMi0QukmmQaLd0mxMi0QPXNiZGxA9cmmRaNy+TLRINluKYZ8n+yqz5mIzdh3ZDvM7eV0k26j6CVKOu50ads3iAaDrTRsYp8uFgV/buPvEpmcUlDEu3TZlmy2enQXdqMTOUdAQBAEA8JhA6LoDD8nhql5yoY9rb/wBZe8vpclh4R7r8dZUsZU068n324GQntPMY7WDRa4zDW4dxutQhT6L8VbuORmyjVdKamug11qfKQcT53egozIwyZGKsOhgciJak7q6KvPU7FarMmpslVZkg2Sqswa2yVVgg2SqsEWyRVmCDZsGq2n3wVnO1Dn9pX/8Aa9B8Z5cVhY1o9/Qz2YHHyw0+uL2r33nWcNiFtRXRgyuAykcCDK7KLi9F7S406kakVKLumSyJMQBAEAQC10jixTWW4ngo6WnizDGRwtB1Ht2Lvf8AtvcZirs0q8liWY5liST1z57OrKpJyk7tm+xbskJmGiF0k0yNiF0k0yNiB0mxMi0QOkmmQaIXSbEyNi3dJNMjY6hqNh9jA1bt7l3Pex/QCW3Lo2w8e82Q2GfnuJCAadrwuVlLdKOPYR8ZWM/j9cH3M72Tv6JrvRrecrx2RnAGcAZwDyZS1mDqdS7KqOgAewT6LBWikUqTu2yuSMCAcH13wor0lilAyBs2x/vUMfeTLNg5aVCLKtjUo15Jdf5MQqz0njbJFWCDZKqwQbJVWYINkqrBBskVYINkqrBBs3HUPTJrf5s58i051k/Vs9Hv8e2czMcPpR5RbVt3HbybHcnPkZPU9nc/z6nQhOIWwQBAEAQDXdP27TheZB/yP/RKR8Q4rlMQqS2RXm/wb6cdVzFChm81S3YCfCcWnSqT5kW9yuSdiK7DOvnKy9qkTZKhVgrzi1vTRjUWzJIJmLELpJpkWiB0mxMi0QukmmYaIXSTTINEDpJpkbHUtWVyweHH/iXwl1wP8eG4kthk56zIgGoa9+dR2W+KSt5/tp+Psd3Jtk/D3NXzlcO2M4AzgDOAAd4koc5GHsOrCfREUg9mQIBxj5Rk/iV3WlJ/9Yliy9/8F4+pV8y1YiXh6I11VntOc2SqsEGyRVmCDZKqwQbJVWCDZLVUWOQBJPAAEn2CG0tbIq7dkXn0beBmabQOk1uB4TXy1PtLiSdCrt0HwZRXmpBG4qQQecEGTdmrGlSad0db0PjeXort9NQW6mG5h7QZV61Pk6jh1H0LB1+XoRqda89j8y9mo9IgCADAMPhsByjtY/mljsjp388qWByr5uvPE1+a5Oy69fp67jfKeirIyyIAMgAAOYDKWqEIwWjFWXcaD0jOSaTVmDCaW0KrAvUMnG8qODdnQZXczyaEoupQVpdXQ93UzZGfWaw6SpXsTIXSSTMWIHSbEyLIWSTTItELpJpkWjperw/dMP8A0k8JecB/GhuBkZ6wIBp+vnn4f1bfFJW8/wBsPH2O9kuyfh7mq5yunbsM4FhnAsM4Fj0HeO0ScOcg1qOsCfQkUY9mQIBx75RV/iVvqVfkEsWXfsLx9SqZm/1MvD0RrqrPac1slVZgg2SKsEGyVVgg2ZrVvQTYyzLPZqTI2PzgHgo6zPLisSqEe97Ee3AYKWKnZaktr/3SdO0bounDLs1IqjnOWbN1luJnAq1p1XebLjh8LSoRtTjb1L2aj0GH01q/TiVJ2Qlv1bFGRz+8OcT1YfFzovrXUc3HZZRxMW7Wl1/frLfU2t66rabBk1FzDLmyIB3e8982Y9xnNTjsaPPkkZ06U6M9sZeqRsE8J2hAEAQDxVyGQ4CRhBQiox2IHskBAEA1HTeG2Lmy4Pkw7+PvlAzmgqOLklsevjt87m+LujGMk5iZkhZJNMjYhdJNMxYhdJNMizomgR+60f018Jfcv/jQ3IgX89gEA07X7zsP6tvikrmfbYePsd/JNk/D3NUzleO4M4AzgDOAAd47RJQ5yMPYdbE+hIop7AEA5F8oQ/iNvqVfkEsOX/sLx9So5q/1MvD0Rr6rPacxskVYINkqrBBskVYINnV9UsEKcHUPrWDlXPOS2/f3ZDulbxlTTrPu1F5yqiqWFj1vXx/BmZ5ToiAIBQtYBZgN7ZbR6cuEzd2sRUIpuSWtlcwSEAQBAEAQBAEA1/WJfLT1T4ym/EqtWg+73N1LYYVklcTNjRCySSZixEySaZFohdJsTI2N90J/+an+mvhL/l38WnuRrZfT2mBANL+UE+Xh/Vt8Uldz3bDx9jv5JzZ+HuantSv2O4NqLAbUWA2osAG4dok4L6kHsOviX8oh7AEA5Nr+P4hZ6lX5BLDl/wCwvH1Kfmz/AFUvD0RgVWe05TZIqwQbJVWCLZXswRudkwQyrrHQij/iJU5857z6PQVqUV3L0J5E2iAIAgCAIAgCAIAgCAIBhNPDyl9U+MpnxO/+0Nz9TfSWow7LKymbbETJJpmGiFkkkyNiJ0k0zBu+hx+70/018J9Ey7+LT3I0PaXk9pgQDSPlFOT4b1bfFJX88WuHj7HfyXmz8Pc0/bnAsdu424sLjbiwuNuLC56H3jtEnBfUjDeo7KJfCjHsAQDlWva/v9nq1fkEsOX/ALC8fUpmcP8AVS8PRGDVZ7TktkirBFskVYItlYWEQudgwn8tPUXwlTnznvPplH9uO5ehNImwQBAEAQBAEAQBAEAQBAMPpoeUvqnxlJ+KH/2p7n6noo7DFssrKNxEyyaMETLJIiyF1k0Rsbjon+RV6i+E+jZb/Ep7keeW0u57jAgGh/KW2T4b1bvGucHOlfQ8fY72S82fh7ml8oOmcPRO0OUHTGiByg6Y0QOUHTGiD0WDMbxxHP1yUI/Ug9h24S8FHPYAgHLteB+/2erX+QSw5d+wvH1KTnP8uXh6IwgE9pyWSKIIskVYIsrAhETreE/lp6q+AlTnzmfTqP7cdyJpE2CAIAgCAIAgCAIAgCAIBSyA8QD2gGa50ac3eUU96M3Z5yK+ivsEh8rR7EeCF2ecinor/aI+Wo9hcELscgnoL/aJn5aj2FwQuzz5unoJ/aJj5aj2FwQuyRVAGQGQHADdNyioqyMHsyBAIrsNW+W2iPlw21VsuzORlCMtqJRnKPNdiP6Po+xq/DT4SPJQ7K4EuWqdp8R9H0fY1fhp8I5KHZXActU7T4j6Po+xq/DT4RyUOyuA5ap2nxH0fR9jV+GnwjkodlcBy1TtPiPo+j7Gr8NPhHJQ7K4DlqnafEuZsNYgCAQWYOpjm1dbE8SyKT7SJNVJLUmzVKjTk7yim9yKfo+n7Gr8NPhM8rPtPiY+Wo9hcEPmFP2NX4afCY5WfafEx8tR7C4I9+YU/ZVfhp8I5WfafEfLUewuCHzGn7Kr8NPhM8rPtPiPlaHYjwROBlwms3pWPYAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIB/9k=";
  
  return (
    <Card className="overflow-hidden hover:border-benevol-300 transition-colors duration-300">
      <CardContent className="p-0">
        <div className="flex flex-col">
          <div className="h-36 bg-benevol-800 relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-benevol-900 opacity-70"></div>
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center z-10 shadow-lg overflow-hidden">
              <img 
                src={defaultLogo} 
                alt={`Logo ${association.name}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="p-5">
            <div className="flex flex-col items-center text-center mb-4">
              <h3 className="font-bold text-lg">{association.name}</h3>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                <span>{association.city}</span>
              </div>
              <Badge variant="outline" className="mt-2">
                {association.isApproved ? "Association active" : "En attente d'approbation"}
              </Badge>
            </div>
            
            <p className="text-sm text-gray-600 mb-4 text-center">
              {association.description.length > 120 
                ? `${association.description.substring(0, 120)}...` 
                : association.description}
            </p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-3.5 w-3.5 mr-2 text-benevol-500" />
                <span>{association.phone}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-3.5 w-3.5 mr-2 text-benevol-500" />
                <span>{association.email}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-3.5 w-3.5 mr-2 text-benevol-500" />
                <span>Membre depuis {new Date(association.registrationDate).toLocaleDateString()}</span>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              Voir le profil
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssociationCard;
