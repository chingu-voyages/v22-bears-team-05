import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';

const useCheckIfAuthLogic = (error: Error | null) => {
  const router = useRouter();
  const client = useApolloClient();

  const clientSideAndNotLoggedIn =
    error &&
    error.message === 'not authenticated' &&
    typeof window !== 'undefined';

  if (clientSideAndNotLoggedIn) {
    client.clearStore();
    router.replace('/login');
  }
};

export const useCheckIfAuth = (): ((error: Error | null) => void) =>
  useCheckIfAuthLogic;
