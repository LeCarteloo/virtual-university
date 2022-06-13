import asyncHandler from "express-async-handler";
import Event from "../models/eventModel.js"
import Subject from "../models/subjectModel.js"
import Course from "../models/courseModel.js"

// @desc Get all events for course
// @route GET /api/events/:courseId
// @access Private 
const getEvents = asyncHandler(async (req, res) =>{

    const course = await Course.findById(req.params.courseId);

    if (!course) {
        res.status(400);
        throw new Error("Course doesn't exist!")
    }

    // Array keeping all events found for given course
    let events = [];

    /* Getting every subject in course subject array 
    and searching all events for it */
    for (const subjectId of course.subjects) {
        const event = await Event.find({subjectId});
        events.push(event);
    }
    
    res.status(200).json(events)
});


// @desc Add event
// @route POST /api/events
// @access Private 
const addEvent = asyncHandler(async (req, res) => {
    const {subjectId, startDate, endDate} = req.body;

    if (!subjectId || !startDate || !endDate) {
        res.status(400);
        throw new Error("Please add all fields!");
    }

    const subject = await Subject.findById(subjectId);

    if (!subject) {
        res.status(400);
        throw new Error("Subject doesn't exist!");
    }

    /* Check if event is taking place between given dates
    $gte - greater or equal than, $lte - less or equal than */
    const eventInProgress = await Event.findOne({
        startDate: {
            $gte: startDate,
            $lte: endDate,
        }
    });

    if (eventInProgress) {
        res.status(400);
        throw new Error("Event is taking place at this time!")
    }

    // End Date must be greater than start date
    if (new Date(startDate).getTime() > new Date(endDate).getTime()) {
        res.status(400);
        throw new Error("Start date is greater than end date!");
    }

    const event = await Event.create({
        ...req.body
    });

    res.status(200).json(event);
});

// @desc Update event
// @route PUT /api/events/:id
// @access Private 
const updateEvent = asyncHandler(async (req, res) => {
    const eventExist = await Event.findById(req.params.id);

    if (!eventExist) {
        res.status(400);
        throw new Error("Event doesn't exist!");
    }

    const {startDate, endDate} = req.body

    // If one of two dates are given, API checks if event can be changed
    if (startDate || endDate) {

        const sDate = startDate ? startDate : eventExist.startDate;
        const eDate = endDate ? endDate : eventExist.endDate;

        /* Check if event is taking place between given dates
        $gte - greater or equal than, $lte - less or equal than */
        const eventInProgress = await Event.findOne({
            startDate: {
                $gte: sDate,
                $lte: eDate,
            }
        });

        if (eventInProgress) {
            res.status(400);
            throw new Error("Event is taking place at this time!")
        }

        // End Date must be greater than start date
        if (new Date(sDate).getTime() > new Date(eDate).getTime()) {
            res.status(400);
            throw new Error("Start date is greater than end date!");
        }
    }
    
    const updatedEvent = await Event.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true }
    );

    res.status(200).json(updatedEvent);
});

export { getEvents, addEvent, updateEvent }