import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { db } from "@/lib/db"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = await createClient()
    const { data: { session }, error } = await supabase.auth.getSession()

    if (!session?.user || error) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const disputeId = id

    const dispute = await db.dispute.findUnique({
      where: { id: disputeId },
      include: {
        contract: {
          include: {
            client: { select: { id: true, name: true } },
            freelancer: { select: { id: true, name: true } },
          },
        },
        filedBy: { select: { id: true, name: true } },
        resolutions: true,
      },
    })

    if (!dispute) {
      return NextResponse.json({ error: "Dispute not found" }, { status: 404 })
    }

    // Check if user is authorized to view this dispute
    const userId = session.user.id
    const userRole = (session.user as any).role // Type assertion in case `role` isn’t on the Supabase User type

    const isParticipant =
      dispute.contract.clientId === userId ||
      dispute.contract.freelancerId === userId
    const isModerator = userRole === "MODERATOR"

    if (!isParticipant && !isModerator) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    return NextResponse.json(dispute)
  } catch (error) {
    console.error("Error fetching dispute:", error)
    return NextResponse.json({ error: "Failed to fetch dispute" }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = await createClient()
    const { data: { session }, error } = await supabase.auth.getSession()

    if (!session?.user || error) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const disputeId = id
    const body = await req.json()
    const { action } = body

    if (action !== 'escalate') {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    // Check if user is a moderator/admin
    const userRole = (session.user as any).role
    const isModerator = userRole === "MODERATOR" || userRole === "ADMIN"

    if (!isModerator) {
      return NextResponse.json({ error: "Unauthorized - Moderator access required" }, { status: 403 })
    }

    // Update dispute status to escalated
    // Fetch dispute first to validate existence and status
    const dispute = await db.dispute.findUnique({
      where: { id: disputeId },
    })

    if (!dispute) {
      return NextResponse.json({ error: "Dispute not found" }, { status: 404 })
    }

    if (dispute.status === 'escalated') {
      return NextResponse.json({ error: "Dispute is already escalated" }, { status: 400 })
    }

    if (dispute.status === 'resolved') {
      return NextResponse.json({ error: "Cannot escalate a resolved dispute" }, { status: 400 })
    }

    // Update dispute status to escalated
    const updatedDispute = await db.dispute.update({
      where: { id: disputeId },
      data: {
        status: 'escalated',
      },
    })

    // Log audit
    await db.auditLog.create({
      data: {
        action: "dispute_escalated",
        actorId: session.user.id,
        payload: { disputeId },
      },
    })

    return NextResponse.json(updatedDispute)
  } catch (error) {
    console.error("Error escalating dispute:", error)
    return NextResponse.json({ error: "Failed to escalate dispute" }, { status: 500 })
  }
}