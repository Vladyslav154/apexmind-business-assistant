
import { NextRequest, NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/db'

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, company } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email and password are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hash(password, 12)

    // Calculate trial dates
    const trialStartDate = new Date()
    const trialEndDate = new Date()
    trialEndDate.setDate(trialStartDate.getDate() + 14) // 14 days trial

    // Create user with trial period
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        company: company || null,
        isTrialActive: true,
        trialStartDate,
        trialEndDate,
        trialNotified3Days: false,
        trialNotifiedLastDay: false
      }
    })

    // Create default folders for the user
    const defaultFolders = [
      { name: 'Документы', color: '#3B82F6', path: '/Документы' },
      { name: 'Отчеты', color: '#10B981', path: '/Отчеты' },
      { name: 'Контракты', color: '#F59E0B', path: '/Контракты' },
      { name: 'Презентации', color: '#8B5CF6', path: '/Презентации' }
    ]

    await Promise.all(
      defaultFolders.map(folder =>
        prisma.folder.create({
          data: {
            userId: user.id,
            name: folder.name,
            color: folder.color,
            path: folder.path,
            isSystem: true
          }
        })
      )
    )

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      message: 'User created successfully',
      user: userWithoutPassword
    })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
