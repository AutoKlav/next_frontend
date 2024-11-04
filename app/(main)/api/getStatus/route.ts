// api/getStatus/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getStatus } from "@/services/grpc";

export async function GET(req: NextRequest) {
  try 
  {
    const status = await getStatus();

    return new NextResponse(JSON.stringify(status), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("Error fetching status:", error);
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch status' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}