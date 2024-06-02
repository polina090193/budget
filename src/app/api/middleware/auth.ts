import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export const validateSession = async (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
  const session = await getSession({ req });

  if (!session?.user?.id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  (req as any).user.id = session.user.id; 
  next();
};
