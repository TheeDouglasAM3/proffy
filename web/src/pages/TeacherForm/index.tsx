import React, { useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../../services/api'

import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Select from '../../components/Select'

import warningIcon from '../../assets/images/icons/warning.svg'

import './styles.css'

function TeacherForm(){
    const history = useHistory()

    const [name,setName] = useState('')
    const [avatar,setAvatar] = useState('')
    const [whatsapp,setWhatsapp] = useState('')
    const [bio,setBio] = useState('')
    
    const [subject,setSubject] = useState('')
    const [cost,setCost] = useState('')

    const [scheduleItems, setScheduleItems] = useState([
        {week_day: '', from: '', to: ''},
    ])

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            {week_day:'', from: '', to: ''},
        ])
    }

    function setScheduleItemValue(position: number, field: string, value: string){
        const updateScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if(index === position) 
                return { ...scheduleItem, [field]: value }
            
            return scheduleItem
        })

        setScheduleItems(updateScheduleItems)
    }

    function handleCreateClass(event: FormEvent) {
        event.preventDefault()

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems,
        }).then(() => {
            alert('Cadastro realizado com sucesso!')
            history.push('/')
        }).catch(() => {
            alert('Erro no cadastro :((')
        })
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Que incrível que você quer dar aulas." 
                description="O primeiro passo é você preencher este formulário de inscrição."
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        
                        <Input 
                            name="name" 
                            label={"Nome Completo" }
                            value={name}
                            onChange={(event) => {setName(event.target.value)}}
                        />

                        <Input 
                            name="avatar"  
                            label="Avatar"
                            value={avatar}
                            onChange={(event) => {setAvatar(event.target.value)}}
                        />

                        <Input 
                            name="whatsapp" 
                            label="Whatsapp"
                            value={whatsapp}
                            onChange={(event) => {setWhatsapp(event.target.value)}} 
                        />

                        <Textarea 
                            name="bio" 
                            label="Biografia"
                            value={bio}
                            onChange={(event) => {setBio(event.target.value)}} 
                        />
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
                            value={subject}
                            onChange={(event) => {setSubject(event.target.value)}}
                        />
                        <Input 
                            name="cost" 
                            label="Custo da sua hora por aula" 
                            value={cost}
                            onChange={(event) => {setCost(event.target.value)}}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={addNewScheduleItem}>
                                + Novo horário
                            </button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={`${scheduleItem}_${index}`} className="schedule-item">
                                    <Select 
                                        name="week-day" 
                                        label="Dia da semana" 
                                        options={[
                                            { value: '0', label: 'Domingo' },
                                            { value: '1', label: 'Segunda-feira' },
                                            { value: '2', label: 'Terça-feira' },
                                            { value: '3', label: 'Quarta-feira' },
                                            { value: '4', label: 'Quinta-feira' },
                                            { value: '5', label: 'Sexta-feira' },
                                            { value: '6', label: 'Sábado' },
                                        ]}
                                        value={scheduleItem.week_day}
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                    />
                                    <Input 
                                        name="from" 
                                        label="Das" 
                                        type="time" 
                                        value={scheduleItem.from}
                                        onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                    />
                                    <Input 
                                        name="to" 
                                        label="Até" 
                                        type="time" 
                                        value={scheduleItem.to}
                                        onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                    />
                                </div>
                            )
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso Importante" />
                            Importante! <br />
                            Preencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm