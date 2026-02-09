
import { connectToDatabase } from "@/database/mongoose";

export const unsubscribeUser = async (email: string) => {
    try {
        const mongoose = await connectToDatabase();
        const db = mongoose.connection.db;
        if (!db) throw new Error('Mongoose connection not connected');

        const result = await db.collection('user').updateOne(
            { email: email },
            { $set: { emailSubscribed: false } }
        );

        return { success: result.modifiedCount > 0 };
    } catch (e) {
        console.error('Error unsubscribing user:', e);
        return { success: false, error: 'Failed to unsubscribe' };
    }
};
