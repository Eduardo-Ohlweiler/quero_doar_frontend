import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function useFromTo() {
  const location = useLocation();
  const navigate = useNavigate();

  const fromTo = React.useMemo(() => {
    try {
      const params = new URLSearchParams(location.search);
      if (params.has('fromTo')) return decodeURIComponent(params.get('fromTo') || '');
      if (location.hash) {
        const raw = location.hash.replace(/^#/, '');
        if (raw.startsWith('fromTo=')) return decodeURIComponent(raw.split('=')[1] || '');
        if (raw.startsWith('/') || raw.startsWith('http')) return raw;
      }
    } catch (e) {
      // ignore
    }
    return null;
  }, [location.search, location.hash]);

  const goBack = React.useCallback(() => {
    if (!fromTo) return navigate(-1);
    if (/^https?:\/\//.test(fromTo)) {
      window.location.href = fromTo;
    } else {
      navigate(fromTo);
    }
  }, [fromTo, navigate]);

  return { fromTo, goBack };
}