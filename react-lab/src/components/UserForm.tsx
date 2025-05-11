import { ChangeEvent, FormEvent, useEffect, useState  } from 'react'
import { User } from '../types/user.types'

type Props = {
  onAdd: (e: Omit<User, 'id'>) => void,
  editUser: User | null,
  onUpdate: (e: User) => void
}

const UserForm = ({ onAdd, editUser, onUpdate  }: Props) => {
  const [formData, setFormData] = useState<User>({
    id: '',
    fullname: '',
    age: 0,
    education: '',
    gender: '',
    skills: [],
    bio: ''
  })

  useEffect(() => {
    if (editUser) {
      setFormData({
        id: editUser.id,
        fullname: editUser.fullname,
        age: editUser.age,
        education: editUser.education,
        gender: editUser.gender,
        skills: editUser.skills,
        bio: editUser.bio
      })
    }
  }, [editUser])

  const handleChange = (e: ChangeEvent< HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement >) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    setFormData(prevState => {
      const updatedSkill = checked
      ? [...prevState.skills, value]
      : prevState.skills.filter(skill => skill !== value)
      return {
        ...prevState,
        skills: updatedSkill
      }
    })
  }

  const handleSubmit = (e: FormEvent< HTMLFormElement >) => {
    e.preventDefault()
    if(editUser) {
      onUpdate(formData)
    } else {
      onAdd(formData)
    }
    handleClear()
  }

  const handleClear = () => {
    setFormData({
      id: '',
      fullname: '',
      age: 0,
      education: '',
      gender: '',
      skills: [],
      bio: ''
    })
  }

  return (
    <div>
      <h2>UserForm</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullname">Full Name:</label>
          <input type="text" name='fullname' id='fullname' value={formData.fullname} onChange={handleChange} required/>
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input type="text" name='age' id='age' value={formData.age} onChange={handleChange} />
        </div>
        <select name="education" id="education" value={formData.education} onChange={handleChange}>
          <option value="">Select your education</option>
          <option value="Grade school">Grade school</option>
          <option value="High school">High school</option>
          <option value="College">College</option>
        </select>
        <div>
          <label htmlFor="gender">Gender:</label>
          <div>
            <input type="radio" id="male" value="Male" name="gender" onChange={handleChange} />
            <label htmlFor="male">Male</label>    
          </div>
          <div>
            <input type="radio" id="female" value="Female" name="gender" onChange={handleChange} />
            <label htmlFor="female">Female</label>    
          </div>
          <div>
            <input type="radio" id="other" value="Other" name="gender" onChange={handleChange} />
            <label htmlFor="other">Other</label> 
          </div>   
        </div>
        <div>
          <label htmlFor="skills">Skills:</label>
          <label>
            <input
              type="checkbox"
              name="skills"
              value="TypeScript"
              checked={formData.skills.includes("TypeScript")}
              onChange={handleCheckboxChange}
            />
            TypeScript
          </label>
          <label>
            <input
              type="checkbox"
              name="skills"
              value="React"
              checked={formData.skills.includes("React")}
              onChange={handleCheckboxChange}
            />
            React
          </label>
          <label>
          <input
              type="checkbox"
              name="skills"
              value="Node"
              checked={formData.skills.includes("Node")}
              onChange={handleCheckboxChange}
            />           
            Node
          </label>
          <label>
            <input
              type="checkbox"
              name="skills"
              value="NoSQL"
              checked={formData.skills.includes("NoSQL")}
              onChange={handleCheckboxChange}
            />
            NoSQL
          </label>
        </div>
        <textarea name="bio" value={formData.bio} onChange={handleChange}></textarea>
        <div>
          <button>
            {formData.id ? "Save Changes" : "Add User"}
          </button>
          <button type='button' onClick={handleClear}>Clear</button>
        </div>
      </form>
    </div>
  )
}

export default UserForm


