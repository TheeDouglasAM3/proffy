import React from 'react'
import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Select from '../../components/Select'

import warningIcon from '../../assets/images/icons/warning.svg'

import './styles.css'

function TeacherForm(){
    return (
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Que incrível que você quer dar aulas." 
                description="O primeiro passo é você preencher este formulário de inscrição."
            />

            <main>
                <fieldset>
                    <legend>Seus dados</legend>
                    
                    <Input name="name" label="Nome Completo" />
                    <Input name="avatar" label="Avatar" />
                    <Input name="whatsapp" label="Whatsapp" />
                    <Textarea name="bio" label="Biografia" />
                </fieldset>

                <fieldset>
                    <legend>Sobre a aula</legend>

                    <Select 
                        name="subject" 
                        label="Matéria" 
                        options={[
                            { value: 'Português', label: 'Português' },
                            { value: 'Matemática', label: 'Matemática' },
                            { value: 'Artes', label: 'Artes' },
                            { value: 'Biologia', label: 'Biologia' },
                            { value: 'Ed Física', label: 'Ed Física' },
                            { value: 'Filosofia', label: 'Filosofia' },
                            { value: 'Física', label: 'Física' },
                            { value: 'Geografia', label: 'Geografia' },
                            { value: 'História', label: 'História' },
                            { value: 'Inglês', label: 'Inglês' },
                            { value: 'Química', label: 'Química' },
                            { value: 'Sociologia', label: 'Sociologia' },
                        ]}
                    />
                    <Input name="cost" label="Custo da sua hora por aula" />
                </fieldset>

                <footer>
                    <p>
                        <img src={warningIcon} alt="Aviso Importante" />
                        Importante! <br />
                        Preencha todos os dados
                    </p>
                    <button type="button">
                        Salvar cadastro
                    </button>
                </footer>
            </main>
        </div>
    )
}

export default TeacherForm