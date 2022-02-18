import express from "express";
import authDecode from "../middleware/authMiddleware";
import Student from "./Student.model";
class StudentController {
  private router: express.Router;
  private route = "/students";
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(this.route, this.getAllStudents);
    this.router.post(this.route, authDecode, this.createStudent);
    this.router.get(`${this.route}/:id`, this.getStudentById);
  }
  private getAllStudents = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const students = await Student.find()
        .sort({ age: -1 })
        .limit(10)
        .select("name age class phone teacherRemarks donatedAmount")
        //@ts-ignore
        .skip(req.query.page * 10 || 0);
      const totalCount = await Student.countDocuments();
      res.status(200).json({ students, results: totalCount });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: error });
    }
  };
  private createStudent = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const student = await Student.create(req.body);
      res.json({ student });
    } catch (err) {
      res.status(500).send(err);
    }
  };
  private getStudentById = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const student = await Student.findById(req.params.id);
      if (!student) {
        return res.status(404).send("Student not found");
      }
      res.json({ student });
    } catch (err) {
      res.status(500).send(err);
    }
  };
}
export default StudentController;
