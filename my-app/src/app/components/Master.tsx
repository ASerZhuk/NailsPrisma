'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import { Avatar, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import { SafeMaster } from '../types'
import { HiOutlineCalendarDays } from 'react-icons/hi2'
import { BsWatch } from 'react-icons/bs'
import { GrMoney } from 'react-icons/gr'

interface MasterProps {
	currentMaster: SafeMaster | null
}

const Master: React.FC<MasterProps> = ({ currentMaster }) => {
	const [tg_name, setTg_Name] = useState()
	const [tg_id, setTg_Id] = useState()

	const router = useRouter()
	const ddays = currentMaster?.disDays

	const dayOfWeekNames: Record<number, string> = {
		0: 'Вск',
		1: 'Пнд',
		2: 'Втр',
		3: 'Срд',
		4: 'Чтв',
		5: 'Птн',
		6: 'Суб',
	}

	const allDaysOfWeek = [1, 2, 3, 4, 5, 6, 0]
	const availableDaysOfWeek: number[] = allDaysOfWeek.filter(
		day => !currentMaster?.disDays.includes(day)
	)
	const availableDayNames = availableDaysOfWeek.map(day => dayOfWeekNames[day])

	useEffect(() => {
		const tg = window.Telegram?.WebApp
		const name = tg?.initDataUnsafe.user?.first_name
		const tg_id = tg?.initDataUnsafe.user?.id
		const id = tg_id?.toString()

		setTg_Name(name)
		setTg_Id(id)

		tg.MainButton.show()
		tg.MainButton.setText('Записаться')
		tg.MainButton.onClick(() => handleNext())
	}, [])

	const handleNext = () => {
		router.push(`/reservation_form`)
	}

	return (
		<>
			<div className='flex flex-col items-center'>
				<Avatar size={220} src={currentMaster?.image} />

				<div
					className='mt-8 text-2xl'
					style={{ color: 'var(--tg-theme-text-color)' }}
				>
					{currentMaster?.firstName} {currentMaster?.lastName}
				</div>
				<div className='mt-2' style={{ color: 'var(--tg-theme-hint-color)' }}>
					{currentMaster?.category}
				</div>
			</div>

			<div className='flex justify-center mt-8'>
				{currentMaster?.chatId === tg_id ? (
					<>
						<button
							style={{
								backgroundColor: 'var(--tg-theme-button-color)',
								color: 'var(--tg-theme-button-text-color)',
							}}
							className='cursor-pointer p-2 pl-4 pr-4 rounded-full text-xs mt-2'
							onClick={() => router.push('/form')}
						>
							Изменить профиль
						</button>
						<button
							style={{
								backgroundColor: 'var(--tg-theme-button-color)',
								color: 'var(--tg-theme-button-text-color)',
							}}
							className='cursor-pointer p-2 pl-4 pr-4 rounded-full text-xs ml-4 mt-2'
							onClick={() => router.push('/appointment_master')}
						>
							Запись ко мне
						</button>
					</>
				) : (
					<button
						style={{
							backgroundColor: 'var(--tg-theme-button-color)',
							color: 'var(--tg-theme-button-text-color)',
						}}
						className='cursor-pointer p-2 pl-4 pr-4 rounded-full text-xs '
						onClick={() => router.push('/appointment_client')}
					>
						Мои записи
					</button>
				)}
			</div>

			<hr
				className='mt-8'
				style={{ borderColor: 'var(--tg-theme-secondary-bg-color)' }}
			/>

			<div
				className='mt-8 text-md flex flex-row justify-between'
				style={{ color: 'var(--tg-theme-text-color)' }}
			>
				<div className='flex items-center'>
					<HiOutlineCalendarDays size={28} className='pr-2' />
					Рабочие дни:
				</div>
				<ul className='flex items-center'>
					{availableDayNames.map(dayName => (
						<li key={dayName} className='pr-2'>
							{dayName}{' '}
						</li>
					))}
				</ul>
			</div>
			<hr
				className='mt-8'
				style={{ borderColor: 'var(--tg-theme-secondary-bg-color)' }}
			/>
			<div
				className='mt-8 text-md flex flex-row justify-between'
				style={{ color: 'var(--tg-theme-text-color)' }}
			>
				<div className='flex items-center'>
					<BsWatch size={28} className='pr-2' />
					Время работы:
				</div>{' '}
				<div>
					с {currentMaster?.startTime} до {currentMaster?.endTime}
				</div>
			</div>
			<hr
				className='mt-8'
				style={{ borderColor: 'var(--tg-theme-secondary-bg-color)' }}
			/>
			<div
				className='mt-8 text-md flex flex-row justify-between'
				style={{ color: 'var(--tg-theme-text-color)' }}
			>
				<div className='flex items-center'>
					<GrMoney size={28} className='pr-2' />
					Стоимость:
				</div>
				<div>{currentMaster?.price} руб.</div>
			</div>
		</>
	)
}

export default Master
