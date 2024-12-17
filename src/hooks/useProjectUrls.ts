import { useState, useEffect } from 'react';
import { RandomURL } from '../types';
import { getProjectUrls } from '../services/database';

export function useProjectUrls(projectId: string | undefined) {
  const [urls, setUrls] = useState<RandomURL[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadProjectUrls = async () => {
      if (!projectId) {
        setUrls([]);
        return;
      }

      setIsLoading(true);
      try {
        const fetchedUrls = await getProjectUrls(projectId);
        setUrls(fetchedUrls);
      } catch (error) {
        console.error('Error loading URLs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjectUrls();
  }, [projectId]);

  return { urls, setUrls, isLoading };
}