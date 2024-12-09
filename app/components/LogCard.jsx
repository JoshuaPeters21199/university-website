'use client'

export default function LogCard(props) {

    return (
        <div className="bg-white shadow p-3 rounded-lg">
            <div className="flex flex-col gap-2">
                <h1 className="font-bold text-2xl">{props.logDate}</h1>
                <h2 className="">
                    Course: <span className="italic">{props.course}</span>
                </h2>

                <h3>
                    Student: <span className="italic">{props.username}</span>
                </h3>

                <p>
                    Message: <span className="italic">{props.message}</span>
                </p>
            </div>
        </div>
    )
}