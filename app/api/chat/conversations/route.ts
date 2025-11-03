import { NextResponse } from "next/server";
import { apiService } from "@/lib/services/api-service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { idReceptor, mensaje, resourceUrl } = body ?? {};

    if (!idReceptor || !mensaje) {
      return NextResponse.json(
        { success: false, message: "Faltan parámetros" },
        { status: 400 }
      );
    }

    const resp = await apiService.createChatConversation({
      idReceptor,
      mensaje,
      resourceUrl,
    });

    return NextResponse.json(resp, { status: resp.success ? 200 : 500 });
  } catch (e) {
    console.error("Error en POST /api/chat/conversations:", e);
    return NextResponse.json(
      { success: false, message: "Error del servidor" },
      { status: 500 }
    );
  }
}

