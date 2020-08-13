import React from 'react'
import api from '../../services/api'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'

export interface Teacher {
    id: number
    subject: string
    cost: number
    name: string
    avatar: string
    whatsapp: string
    bio: string
}

interface TeacherItemProps {
    teacher: Teacher
    textWhatsapp: string
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, textWhatsapp}) => {
    function createNewConnection() {
        api.post('connections', {
            user_id: teacher.id,
        })
    }

    return (
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt={teacher.name} />
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>

            <p>{teacher.bio}</p>

            <footer>
                <p>
                    Preço/hora
                            <strong>R$ {teacher.cost},00</strong>
                </p>

                <a 
                    target="_blank"
                    onClick={createNewConnection}
                    href={`https://wa.me/${teacher.whatsapp}?text=${textWhatsapp}`}
                >
                    <img src={whatsappIcon} alt="whatsapp" />

                    Entrar em contato
                </a>
            </footer>
        </article>
    )
}

export default TeacherItem