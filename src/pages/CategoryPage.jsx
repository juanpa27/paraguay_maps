import React, { useEffect, useState, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../config/supabaseClient';
import MapCard from '../components/MapCard';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const MapCardSkeleton = () => (
  <div className="card bg-base-100 shadow-2xl">
    <div className="relative pt-[56.25%] overflow-hidden">
      <Skeleton className="absolute inset-0" />
    </div>
    <div className="card-body p-4">
      <Skeleton height={24} width="80%" className="mb-2" />
      <Skeleton count={2} className="mb-2" />
      <div className="mt-2">
        <Skeleton width={60} height={20} className="rounded-full" />
      </div>
      <div className="card-actions justify-end mt-4">
        <Skeleton width={60} height={32} className="rounded-lg" />
      </div>
    </div>
  </div>
);

const CategoryPage = () => {
  const { category } = useParams();
  const [maps, setMaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchMaps = async () => {
      const { data, error } = await supabase
        .from('maps')
        .select('*')
        .eq('category', category)
        .eq('status', true);
      
      if (error) {
        console.error('Error fetching maps:', error);
      } else {
        setMaps(data || []);
      }
      setLoading(false);
    };

    fetchMaps();
  }, [category]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <Layout>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Categoría: {category}</h1>
            <Link to="/" className="btn btn-primary btn-sm">
              <ChevronLeft size={16} />
              Volver al inicio
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <MapCardSkeleton key={index} />
              ))
            ) : maps.length > 0 ? (
              maps.map((map) => (
                <Suspense fallback={<MapCardSkeleton />} key={map.id}>
                  <MapCard map={map} />
                </Suspense>
              ))
            ) : (
              <div className="col-span-full">
                <p className="text-center text-lg">No hay mapas disponibles para esta categoría.</p>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </Layout>
    </motion.div>
  );
};

export default CategoryPage;