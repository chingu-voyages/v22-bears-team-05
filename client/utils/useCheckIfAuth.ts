import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useCheckIfAuth = (error: Error | null) => {
  const router = useRouter();
  const client = useApolloClient();

  useEffect(() => {
    if (error === null) return;

    const clientSideAndNotLoggedIn =
      error &&
      error.message === 'not authenticated' &&
      typeof window !== 'undefined';

    if (clientSideAndNotLoggedIn) {
      client.clearStore();
      router.replace('/login');
    }
  }, [client, router, error]);
};
