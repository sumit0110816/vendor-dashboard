import { NextResponse } from "next/server"
import { readDb, writeDb } from "@/lib/db"

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const db = readDb()
  const id = parseInt(params.id)
  
  const productIndex = db.products.findIndex((p: any) => p.id === id)
  
  if (productIndex === -1) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  const updates = await request.json()
  
  // Merge updates
  db.products[productIndex] = {
    ...db.products[productIndex],
    ...updates,
    status: updates.stock !== undefined ? (parseInt(updates.stock) > 0 ? "active" : "out_of_stock") : db.products[productIndex].status
  }

  writeDb(db)
  
  return NextResponse.json(db.products[productIndex])
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const db = readDb()
  const id = parseInt(params.id)
  
  db.products = db.products.filter((p: any) => p.id !== id)
  writeDb(db)
  
  return NextResponse.json({ success: true })
}
