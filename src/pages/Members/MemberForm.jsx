import React, { useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as memberService from "../../services/memberService";


const committeeItems = [
    { id: 'HR', title: 'HR' },
    { id: 'EV', title: 'EV' },
    { id: 'BD', title: 'BD' },
    { id: 'IM', title: 'IM' },
]

const initialFValues = {
    id: 0,
    fullName: '',
    email: '',
    role: '',
    rank: '',
    committee: 'male',
    projectId: '',
    joinDate: new Date(),
    isActive: false,
}

export default function MemberForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('role' in fieldValues)
            temp.role = fieldValues.role ? "" : "This field is required."
        if ('rank' in fieldValues)
            temp.rank = fieldValues.rank ? "" : "This field is required."    
        if ('projectId' in fieldValues)
            temp.projectId = fieldValues.projectId.length != 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="fullName"
                        label="Full Name"
                        value={values.fullName}
                        onChange={handleInputChange}
                        error={errors.fullName}
                    />
                    <Controls.Input
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <Controls.Input
                        label="Role"
                        name="role"
                        value={values.role}
                        onChange={handleInputChange}
                        error={errors.role}
                    />
                    <Controls.Input
                        label="Rank"
                        name="rank"
                        value={values.rank}
                        onChange={handleInputChange}
                        error={errors.role}
                    />

                </Grid>
                <Grid item xs={6}>
                    <Controls.RadioGroup
                        name="committee"
                        label="Committee"
                        value={values.committee}
                        onChange={handleInputChange}
                        items={committeeItems}
                    />
                    <Controls.Select
                        name="projectId"
                        label="Project"
                        value={values.projectId}
                        onChange={handleInputChange}
                        options={memberService.getProjectCollection()}
                        error={errors.projectId}
                    />
                    <Controls.DatePicker
                        name="joinDate"
                        label="Join Date"
                        value={values.joinDate}
                        onChange={handleInputChange}
                    />
                    <Controls.Checkbox
                        name="isActive"
                        label="Active Member"
                        value={values.isActive}
                        onChange={handleInputChange}
                    />

                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
