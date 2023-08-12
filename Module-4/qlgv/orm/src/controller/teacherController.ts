import teacherService from "../service/teacherService";

class TeacherController{
    findAll = async (req,res) => {
        let {name, minAge, maxAge, minSalary, maxSalary} = req.query
        if(name == undefined && minAge == undefined && maxAge == undefined && maxSalary == undefined && minSalary == undefined){
            let data = await teacherService.findAll()
            res.json(data)
        } else if (name != undefined && minAge == undefined && maxAge == undefined && maxSalary == undefined && minSalary == undefined){
            let data = await teacherService.findByName(name)
            res.json(data)
        } else if (name == undefined && minAge != undefined && maxAge != undefined && maxSalary == undefined && minSalary == undefined){
            let data = await teacherService.findByAgeRange(Number(minAge),Number(maxAge))
            res.json(data)
        } else if (name == undefined && minAge == undefined && maxAge == undefined && maxSalary != undefined && minSalary != undefined){
            let data = await teacherService.findBySalaryRange(Number(minSalary),Number(maxSalary))
            res.json(data)
        }
    }
    add = async (req,res) => {
        await teacherService.add(req.body)
        res.json('complete')
    }
    update = async (req,res) => {
        await teacherService.update(req.params.id, req.body)
        res.json('complete')
    }
    delete = async(req,res) => {
        await teacherService.delete(req.params.id)
        res.json('complete')
    }
}
export default new TeacherController()