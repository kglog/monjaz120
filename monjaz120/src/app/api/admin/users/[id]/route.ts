import { NextResponse } from "next/server";

export async function GET(request: Request) {
	return NextResponse.json({ message: "admin user endpoint placeholder" }, { status: 200 });
}

export async function PUT(request: Request) {
	return NextResponse.json({ message: "not implemented" }, { status: 501 });
}

export async function DELETE(request: Request) {
	return NextResponse.json({ message: "not implemented" }, { status: 501 });
}
