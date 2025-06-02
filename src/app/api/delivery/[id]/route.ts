import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  return NextResponse.json({
    message: '✅ تم استلام الطلب بنجاح',
    id,
  });
}
