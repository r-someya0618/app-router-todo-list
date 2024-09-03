import { TaskDocument, TaskModel } from '@/models/task'
import { connectDb } from '@/utlis/database'
import { NextResponse } from 'next/server'

export const GET = async () => {
  try {
    await connectDb()
    const completedTasks: TaskDocument[] = await TaskModel.find({
      isCompleted: true,
    })

    return NextResponse.json({ message: 'タスク取得成功', tasks: completedTasks })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'タスク取得失敗' }, { status: 500 })
  }
}

// キャッシュを使わず常に最新を取得させる
export const dynamic = 'force-dynamic'
