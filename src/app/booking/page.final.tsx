"use client";

import React, { useState, Suspense, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/header/Header';
import Footer from '@/components/layout/footer/Footer';
import Image from 'next/image';
import { 
  ArrowRight, 
  Car, 
  Clock, 
  Calendar, 
  MapPin, 
  Info, 
  CheckCircle, 
  AlertCircle, 
  Users 
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

// [Rest of your existing booking page content]
// Copy the remaining component code from the original file
// This ensures we maintain all functionality while fixing imports