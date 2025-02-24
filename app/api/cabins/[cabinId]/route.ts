import { getBookedDatesByCabinId, getCabin } from '../../../_lib/data-service';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  req: NextRequest,
  { params }: { params: Record<string, string> }
) => {
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(Number(cabinId)),
      getBookedDatesByCabinId(Number(cabinId)),
    ]);

    return NextResponse.json({ success: true, cabin, bookedDates });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
