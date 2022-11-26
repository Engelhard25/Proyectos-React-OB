import React, {useRef} from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { task } from '../../../models/task.class';
import { levels } from '../../../models/levels.enum';

const TaskFormik = ({add, length}) => {

    const NameRef = useRef('');
    const DescriptionRef = useRef('');
    const LevelRef = useRef(levels.normal);

    function addTask (e){
        e.preventDefault();
        const newTask = new task(
            NameRef.current.value,
            DescriptionRef.current.value,
            false,
            LevelRef.current.value

        );
        add(newTask);
    }

    const initialValues = {
        name: '',
        description: '',
        completed: false,
        level: levels.normal
    }

    const addTaskSchema = Yup.object().shape({

        name: Yup.string()
        .min(6, 'Name for task are too short')
        .required('Insert a task, the field can not be empty'),
        description: Yup.string()
        .min(10, 'Description is too short, please describe tasks accurately')
        .required('Description for task, must be added'),

    })

    return (
        <div>
            <h4>Register Formik Tasks</h4>
            <Formik
            initialValues={initialValues}
            validationSchema = {addTaskSchema}
            onSubmit={async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            alert(JSON.stringify(values, null, 2));
            }}
            >

{({     values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur }) => (

                    <Form>
                    <label htmlFor="name">Task name</label>
                    <Field id="name" type="name" name="name" placeholder="Task name" />
                    {errors.name && touched.name && (
                                <ErrorMessage name='name' component='div'></ErrorMessage>
                        )}

                    <label htmlFor="description">Task description</label>
                    <Field id="description" type="description" name="description" placeholder=" Task description" />
                    {errors.description && touched.description && (
                                <ErrorMessage name='description' component='div'></ErrorMessage>
                        )}

                    <label htmlFor="level">Task level</label>
                    <Field name="level" as="select">
                        <option value={levels.normal}>Normal</option>
                        <option value={levels.urgent}>Urgent</option>
                        <option value={levels.blocking}>Blocking</option>
                    </Field>
                    <hr></hr>
                    <button type="submit">Add new task</button>
                    <div>
                    {isSubmitting ? (<p>Creating task...</p>) : null}
                    </div>

                    </Form>
                    )}
            
            </Formik>
        </div>
    );
}

export default TaskFormik;
