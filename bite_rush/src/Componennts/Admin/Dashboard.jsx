import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Plus,
  Search,
  Zap,
  LogOut,
  Package,
  UtensilsCrossed,
  BarChart3,
  Pencil,
  Trash2,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

// --- মক ডেটা (আপনার আসল base44 API এর সাথে রিপ্লেস করবেন) ---
const mockOrders = [
  {
    id: '1',
    token_number: 'TKN-001',
    trx_id: 'TRX-123456',
    customer_name: 'John Doe',
    customer_phone: '01712345678',
    status: 'pending',
    total_amount: 450,
    created_date: new Date().toISOString(),
  },
  {
    id: '2',
    token_number: 'TKN-002',
    trx_id: 'TRX-789012',
    customer_name: 'Sarah Smith',
    customer_phone: '01898765432',
    status: 'confirmed',
    total_amount: 220,
    created_date: new Date().toISOString(),
  },
  {
    id: '3',
    token_number: 'TKN-003',
    trx_id: 'TRX-345678',
    customer_name: 'Mike Ross',
    customer_phone: '01611122233',
    status: 'delivered',
    total_amount: 780,
    created_date: new Date().toISOString(),
  },
];

const mockFoods = [
  {
    id: '1',
    name: 'Chicken Burger',
    category: 'burger',
    original_price: 250,
    offer_price: 199,
    is_available: true,
    is_combo: false,
    image_url:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100',
  },
  {
    id: '2',
    name: 'Classic Pizza',
    category: 'pizza',
    original_price: 450,
    offer_price: 350,
    is_available: true,
    is_combo: false,
    image_url:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100',
  },
  {
    id: '3',
    name: 'Student Combo',
    category: 'combo',
    original_price: 350,
    offer_price: 250,
    is_available: true,
    is_combo: true,
    image_url:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100',
  },
];

// --- আপনার base44 API প্যাটার্নের মক ক্লায়েন্ট ---
const base44 = {
  entities: {
    Order: {
      list: async (sort, limit) => Promise.resolve(mockOrders),
      update: async (id, data) => Promise.resolve({ id, ...data }),
    },
    FoodItem: {
      list: async () => Promise.resolve(mockFoods),
      delete: async (id) => Promise.resolve(id),
    },
  },
  auth: {
    logout: (path) => {
      window.location.href = path;
    },
  },
};

// --- Stat Card কম্পোনেন্ট (আপনার স্টাইলেই) ---
function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className='bg-card rounded-2xl border border-border p-4'>
      <div className='flex items-center gap-2 mb-1'>
        <Icon className={`w-4 h-4 ${color}`} />
        <span className='text-xs text-muted-foreground'>{label}</span>
      </div>
      <p className={`text-xl font-bold font-display ${color}`}>{value}</p>
    </div>
  );
}

// --- Dashboard এর মূল কম্পোনেন্ট ---
export default function AdminDashboard() {
  const { toast } = useToast();
  const [orders, setOrders] = useState([]);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQ, setSearchQ] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [foodFormOpen, setFoodFormOpen] = useState(false);
  const [editFood, setEditFood] = useState(null);

  // ডেটা লোড করার ফাংশন (আপনার স্টাইলেই)
  const loadData = async () => {
    try {
      const [ordersData, foodsData] = await Promise.all([
        base44.entities.Order.list('-created_date', 200),
        base44.entities.FoodItem.list(),
      ]);
      setOrders(ordersData);
      setFoods(foodsData);
    } catch (error) {
      console.error('Data fetch error:', error);
      toast({ title: 'Failed to load data', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // স্টেটাস আপডেট করার ফাংশন
  const updateOrderStatus = async (id, status) => {
    await base44.entities.Order.update(id, { status });
    toast({ title: `Order status updated to ${status}`, duration: 3000 });
    loadData();
  };

  // ফুড আইটেম ডিলিট করার ফাংশন
  const deleteFood = async (id) => {
    await base44.entities.FoodItem.delete(id);
    toast({ title: 'Food item deleted', duration: 3000 });
    loadData();
  };

  // লগআউট ফাংশন
  const handleLogout = () => {
    base44.auth.logout('/admin-login');
  };

  // ফিল্টার লজিক
  const filteredOrders = orders.filter((o) => {
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    const q = searchQ.toLowerCase();
    const matchSearch =
      !searchQ ||
      (o.token_number || '').toLowerCase().includes(q) ||
      (o.trx_id || '').toLowerCase().includes(q) ||
      (o.customer_phone || '').includes(q) ||
      (o.customer_name || '').toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  // স্ট্যাটাস ব্যাজ কম্পোনেন্ট
  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      confirmed: 'bg-blue-50 text-blue-700 border-blue-200',
      delivered: 'bg-green-50 text-green-700 border-green-200',
      cancelled: 'bg-red-50 text-red-700 border-red-200',
    };
    return (
      <span
        className={`text-xs font-medium px-2.5 py-1 rounded-full border ${styles[status] || styles.pending}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // স্ট্যাটিস্টিকস
  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    confirmed: orders.filter((o) => o.status === 'confirmed').length,
    delivered: orders.filter((o) => o.status === 'delivered').length,
    revenue: orders
      .filter((o) => o.status !== 'cancelled')
      .reduce((s, o) => s + (o.total_amount || 0), 0),
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center'>
        <div className='w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin' />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background'>
      {/* হেডার */}
      <div className='sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border'>
        <div className='max-w-7xl mx-auto px-4 h-16 flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className='w-9 h-9 rounded-xl bg-primary flex items-center justify-center'>
              <Zap className='w-4.5 h-4.5 text-primary-foreground' />
            </div>
            <span className='font-display text-lg font-bold'>
              Bite<span className='text-primary'>Rush</span>{' '}
              <span className='text-muted-foreground font-normal text-sm'>
                Admin
              </span>
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <Link to='/'>
              <Button
                variant='ghost'
                size='sm'
                className='rounded-xl text-xs'>
                View Menu
              </Button>
            </Link>
            <Button
              variant='ghost'
              size='sm'
              className='rounded-xl text-xs text-destructive'
              onClick={handleLogout}>
              <LogOut className='w-4 h-4 mr-1' /> Logout
            </Button>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 py-6 space-y-6'>
        {/* স্ট্যাট কার্ডসমূহ */}
        <div className='grid grid-cols-2 md:grid-cols-5 gap-3'>
          <StatCard
            icon={Package}
            label='Total Orders'
            value={stats.total}
            color='text-foreground'
          />
          <StatCard
            icon={Clock}
            label='Pending'
            value={stats.pending}
            color='text-yellow-600'
          />
          <StatCard
            icon={CheckCircle2}
            label='Confirmed'
            value={stats.confirmed}
            color='text-blue-600'
          />
          <StatCard
            icon={Truck}
            label='Delivered'
            value={stats.delivered}
            color='text-green-600'
          />
          <StatCard
            icon={BarChart3}
            label='Revenue'
            value={`৳${stats.revenue}`}
            color='text-primary'
          />
        </div>

        {/* ট্যাবস */}
        <Tabs
          defaultValue='orders'
          className='w-full'>
          <TabsList className='rounded-xl w-full justify-start border-b border-border bg-transparent p-0'>
            <TabsTrigger
              value='orders'
              className='rounded-lg data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary pb-3'>
              <Package className='w-4 h-4 mr-1.5' /> Orders
            </TabsTrigger>
            <TabsTrigger
              value='menu'
              className='rounded-lg data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary pb-3'>
              <UtensilsCrossed className='w-4 h-4 mr-1.5' /> Menu
            </TabsTrigger>
          </TabsList>

          {/* অর্ডার ট্যাব */}
          <TabsContent
            value='orders'
            className='mt-4'>
            <div className='bg-card rounded-2xl border border-border overflow-hidden'>
              <div className='p-4 border-b border-border flex flex-col sm:flex-row gap-3'>
                <div className='relative flex-1'>
                  <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                  <Input
                    placeholder='Search by token, TrxID, phone, name...'
                    value={searchQ}
                    onChange={(e) => setSearchQ(e.target.value)}
                    className='pl-9 rounded-xl'
                  />
                </div>

                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}>
                  <SelectTrigger className='rounded-xl w-full sm:w-40'>
                    <SelectValue placeholder='All Status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Status</SelectItem>
                    <SelectItem value='pending'>Pending</SelectItem>
                    <SelectItem value='confirmed'>Confirmed</SelectItem>
                    <SelectItem value='delivered'>Delivered</SelectItem>
                    <SelectItem value='cancelled'>Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* অর্ডার টেবিল */}
              <div className='overflow-x-auto'>
                <table className='w-full text-sm'>
                  <thead>
                    <tr className='border-b border-border text-left text-muted-foreground'>
                      <th className='py-3 px-3 font-medium'>Token</th>
                      <th className='py-3 px-3 font-medium'>Customer</th>
                      <th className='py-3 px-3 font-medium'>Total</th>
                      <th className='py-3 px-3 font-medium'>Status</th>
                      <th className='py-3 px-3 font-medium text-center'>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr
                        key={order.id}
                        className='border-b border-border/50 hover:bg-muted/30 transition-colors'>
                        <td className='py-3 px-3 font-medium'>
                          #{order.token_number}
                        </td>
                        <td className='py-3 px-3'>
                          <p className='font-medium'>{order.customer_name}</p>
                          <p className='text-xs text-muted-foreground'>
                            {order.customer_phone}
                          </p>
                        </td>
                        <td className='py-3 px-3 font-bold'>
                          ৳{order.total_amount}
                        </td>
                        <td className='py-3 px-3'>
                          {getStatusBadge(order.status)}
                        </td>
                        <td className='py-3 px-3 text-center'>
                          <div className='flex justify-center gap-1.5'>
                            {order.status === 'pending' && (
                              <Button
                                size='sm'
                                variant='ghost'
                                className='h-7 w-7 p-0 rounded-lg text-blue-600 hover:bg-blue-50'
                                onClick={() =>
                                  updateOrderStatus(order.id, 'confirmed')
                                }>
                                <CheckCircle2 className='w-3.5 h-3.5' />
                              </Button>
                            )}
                            {order.status === 'confirmed' && (
                              <Button
                                size='sm'
                                variant='ghost'
                                className='h-7 w-7 p-0 rounded-lg text-green-600 hover:bg-green-50'
                                onClick={() =>
                                  updateOrderStatus(order.id, 'delivered')
                                }>
                                <Truck className='w-3.5 h-3.5' />
                              </Button>
                            )}
                            {order.status === 'pending' && (
                              <Button
                                size='sm'
                                variant='ghost'
                                className='h-7 w-7 p-0 rounded-lg text-destructive hover:bg-destructive/10'
                                onClick={() =>
                                  updateOrderStatus(order.id, 'cancelled')
                                }>
                                <XCircle className='w-3.5 h-3.5' />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredOrders.length === 0 && (
                  <div className='text-center py-12 text-muted-foreground text-sm'>
                    No orders found.
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* মেনু ট্যাব */}
          <TabsContent
            value='menu'
            className='mt-4'>
            <div className='bg-card rounded-2xl border border-border overflow-hidden'>
              <div className='p-4 border-b border-border flex justify-between items-center'>
                <h3 className='font-display font-semibold'>
                  Food Items ({foods.length})
                </h3>
                <Button
                  onClick={() => {
                    setEditFood(null);
                    setFoodFormOpen(true);
                  }}
                  className='rounded-xl'
                  size='sm'>
                  <Plus className='w-4 h-4 mr-1' /> Add Item
                </Button>
              </div>

              <div className='overflow-x-auto'>
                <table className='w-full text-sm'>
                  <thead>
                    <tr className='border-b border-border text-left text-muted-foreground'>
                      <th className='py-3 px-3 font-medium'>Image</th>
                      <th className='py-3 px-3 font-medium'>Name</th>
                      <th className='py-3 px-3 font-medium'>Category</th>
                      <th className='py-3 px-3 font-medium'>Price</th>
                      <th className='py-3 px-3 font-medium'>Offer</th>
                      <th className='py-3 px-3 font-medium'>Status</th>
                      <th className='py-3 px-3 font-medium text-right'>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {foods.map((food) => (
                      <tr
                        key={food.id}
                        className='border-b border-border/50 hover:bg-muted/30 transition-colors'>
                        <td className='py-2 px-3'>
                          <div className='w-10 h-10 rounded-lg bg-muted overflow-hidden'>
                            {food.image_url ? (
                              <img
                                src={food.image_url}
                                alt={food.name}
                                className='w-full h-full object-cover'
                              />
                            ) : (
                              <div className='w-full h-full flex items-center justify-center text-xs'>
                                🍔
                              </div>
                            )}
                          </div>
                        </td>
                        <td className='py-2 px-3 font-medium'>
                          {food.name}
                          {food.is_combo && (
                            <span className='ml-1.5 text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded uppercase'>
                              Combo
                            </span>
                          )}
                        </td>
                        <td className='py-2 px-3 text-muted-foreground capitalize'>
                          {food.category}
                        </td>
                        <td className='py-2 px-3 font-semibold'>
                          ৳{food.original_price}
                        </td>
                        <td className='py-2 px-3 text-primary font-semibold'>
                          {food.offer_price && food.offer_price > 0
                            ? `৳${food.offer_price}`
                            : '-'}
                        </td>
                        <td className='py-2 px-3'>
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded-full ${food.is_available ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            {food.is_available ? 'Available' : 'Unavailable'}
                          </span>
                        </td>
                        <td className='py-2 px-3 text-right'>
                          <div className='flex justify-end gap-1.5'>
                            <Button
                              size='sm'
                              variant='ghost'
                              className='h-7 w-7 p-0 rounded-lg'
                              onClick={() => {
                                setEditFood(food);
                                setFoodFormOpen(true);
                              }}>
                              <Pencil className='w-3.5 h-3.5' />
                            </Button>

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  size='sm'
                                  variant='ghost'
                                  className='h-7 w-7 p-0 rounded-lg text-destructive'>
                                  <Trash2 className='w-3.5 h-3.5' />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Delete {food.name}?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel className='rounded-xl'>
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    className='rounded-xl'
                                    onClick={() => deleteFood(food.id)}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {foods.length === 0 && (
                  <div className='text-center py-12 text-muted-foreground text-sm'>
                    No food items yet. Add your first item!
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* মোডাল ফর্ম ডামি প্লেসহোল্ডার */}
      {foodFormOpen && (
        <FoodForm
          open={foodFormOpen}
          onClose={() => {
            setFoodFormOpen(false);
            setEditFood(null);
          }}
          editItem={editFood}
          onSave={loadData}
        />
      )}
    </div>
  );
}
