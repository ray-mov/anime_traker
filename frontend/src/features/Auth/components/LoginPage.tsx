import type React from "react"
import { useForm, type SubmitHandler } from "react-hook-form"

interface IFormInput {

    email: string;
    password: string;
}

export default function LoginPage() {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IFormInput>()

    const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)

    return (
        <form onSubmit={handleSubmit(onSubmit)}  style={styles.form}>
          
            <label>Email</label>
            <input {...register("email",
                { required: "Email Address is required" })}
                aria-invalid={errors.email ? "true" : "false"}
                style={styles.input}
            />
            {errors.email && <p role="alert" style={styles.error}>{errors.email.message}</p>}

            <label>Password</label>
            <input {...register("password",
                {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                }
            )} 
            style={styles.input}
            />
            {errors.password && <p role="alert" style={styles.error}>{errors.password.message}</p>}

            <input type="submit" style={styles.input} />

        </form>
    ) 
}

const styles: Record<string, React.CSSProperties> = {
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        margin: "20px auto",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center"
    },
  input: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: 300
  },
  error: {
    color: "red",
    fontSize: "12px",
    fontWeight: 300
  },
}


