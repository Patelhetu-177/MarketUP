
import { unsubscribeUser } from "@/lib/actions/unsubscribe.action";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const result = await unsubscribeUser(email);

    if (result.success) {
        return new NextResponse(`
            <html>
                <body style="font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; background-color: #050505; color: white;">
                    <div style="text-align: center; padding: 40px; background-color: #141414; border-radius: 8px; border: 1px solid #30333A;">
                        <h1 style="color: #FDD458;">Unsubscribed Successfully</h1>
                        <p>You have been unsubscribed from MarketUP news updates.</p>
                        <a href="/" style="color: #FDD458; text-decoration: underline;">Go back to MarketUP</a>
                    </div>
                </body>
            </html>
        `, {
            headers: { 'Content-Type': 'text/html' }
        });
    } else {
        return NextResponse.json({ error: "Failed to unsubscribe" }, { status: 500 });
    }
}
