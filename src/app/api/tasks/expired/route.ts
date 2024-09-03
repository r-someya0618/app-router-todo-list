import { TaskDocument, TaskModel } from '@/models/task'
import { connectDb } from '@/utlis/database'
import { NextResponse } from 'next/server'

export const GET = async () => {
  const currentDate = new Date()
    .toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\//g, '-')
  console.log(currentDate)
  try {
    await connectDb()
    const expiredTasks: TaskDocument[] = await TaskModel.find({
      isCompleted: false,
      dueDate: { $lt: currentDate },
    })

    return NextResponse.json({ message: 'タスク取得成功', tasks: expiredTasks })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'タスク取得失敗' }, { status: 500 })
  }
}

// キャッシュを使わず常に最新を取得させる
export const dynamic = 'force-dynamic'
