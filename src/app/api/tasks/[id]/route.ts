import { TaskDocument, TaskModel } from '@/models/task'
import { connectDb } from '@/utlis/database'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (
  _: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDb()
    const task = await TaskModel.findById(params.id)
    if (!task) {
      return NextResponse.json({ message: 'タスクが存在しません' }, { status: 404 })
    }
    return NextResponse.json({ message: 'タスク取得成功', task })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'タスク取得失敗' }, { status: 500 })
  }
}

// キャッシュを使わず常に最新を取得させる
export const dynamic = 'force-dynamic'
