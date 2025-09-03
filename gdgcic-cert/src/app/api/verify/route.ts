import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const serialValue = searchParams.get("serial");
  if (!serialValue) {
    return NextResponse.json({ error: "Missing serial" }, { status: 400 });
  }

  const serial = await prisma.serial.findUnique({
    where: { value: serialValue },
    include: {
      track: true,
      certificate: {
        include: { recipient: true },
      },
    },
  });

  if (!serial || !serial.certificate) {
    return NextResponse.json({ valid: false }, { status: 404 });
  }

  const cert = serial.certificate;
  return NextResponse.json({
    valid: true,
    serial: serial.value,
    track: serial.track.name,
    year: serial.year,
    recipient: cert.recipient?.name,
    recipientEmail: cert.recipient?.email,
    status: cert.status,
    issuedAt: cert.sentAt,
  });
}

