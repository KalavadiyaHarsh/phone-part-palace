
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Users, DollarSign } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹45,231</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">237</div>
            <p className="text-xs text-muted-foreground">
              +5 added today
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2,842</div>
            <p className="text-xs text-muted-foreground">
              +18% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm">
                  <th className="py-2 font-medium">Order ID</th>
                  <th className="py-2 font-medium">Customer</th>
                  <th className="py-2 font-medium">Status</th>
                  <th className="py-2 font-medium">Amount</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr>
                  <td className="py-2">#ORD-8924</td>
                  <td className="py-2">Rahul Sharma</td>
                  <td className="py-2"><span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Completed</span></td>
                  <td className="py-2">₹1,249</td>
                </tr>
                <tr>
                  <td className="py-2">#ORD-8923</td>
                  <td className="py-2">Priya Patel</td>
                  <td className="py-2"><span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Processing</span></td>
                  <td className="py-2">₹849</td>
                </tr>
                <tr>
                  <td className="py-2">#ORD-8922</td>
                  <td className="py-2">Arjun Gupta</td>
                  <td className="py-2"><span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Shipped</span></td>
                  <td className="py-2">₹2,399</td>
                </tr>
                <tr>
                  <td className="py-2">#ORD-8921</td>
                  <td className="py-2">Neha Singh</td>
                  <td className="py-2"><span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Completed</span></td>
                  <td className="py-2">₹699</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Popular Products</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm">
                  <th className="py-2 font-medium">Product</th>
                  <th className="py-2 font-medium">Sold</th>
                  <th className="py-2 font-medium">Price</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr>
                  <td className="py-2">Mobile Combo For iPhone 14 Pro Max</td>
                  <td className="py-2">87</td>
                  <td className="py-2">₹8,269</td>
                </tr>
                <tr>
                  <td className="py-2">Electric OCA Glue Remover Tool</td>
                  <td className="py-2">65</td>
                  <td className="py-2">₹1,049</td>
                </tr>
                <tr>
                  <td className="py-2">RD 009T LCD Separator Machine</td>
                  <td className="py-2">49</td>
                  <td className="py-2">₹2,799</td>
                </tr>
                <tr>
                  <td className="py-2">Fast Charging USB Cable Type C</td>
                  <td className="py-2">128</td>
                  <td className="py-2">₹249</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
