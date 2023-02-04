import User from '@/models/User';
import db from '@/utils/db';
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    return res.status(401).send('admin signin required');
  }
  await db.connect();
  const toUpdateUser = await User.findById(req.query.id);
  toUpdateUser.isAdmin = !toUpdateUser.isAdmin;
  await toUpdateUser.save();
  await db.disconnect();
  res.send({
    message: 'User is updated',
  });
};

export default handler;
