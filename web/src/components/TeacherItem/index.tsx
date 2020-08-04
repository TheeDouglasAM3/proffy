import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'

const TeacherItem = () => {

    return (
        <article className="teacher-item">
            <header>
                <img src="https://avatars2.githubusercontent.com/u/33377432?s=460&u=7cc319a628dc40f856b4d2e0d8121160ac0c532f&v=4" alt="Douglas" />
                <div>
                    <strong>Douglas</strong>
                    <span>Matemática</span>
                </div>
            </header>

            <p>
                Entusiasta das melhores tecnologias de matemática avançada
                <br /><br />
                Está há dois anos tentando contar de 1 à 1 milhão .
            </p>

            <footer>
                <p>
                    Preço/hora
                            <strong>R$ 50,00</strong>
                </p>

                <button type="button">
                    <img src={whatsappIcon} alt="whatsapp" />

                    Entrar em contato
                </button>
            </footer>
        </article>
    )
}

export default TeacherItem