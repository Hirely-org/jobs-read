import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '1s', target: 10000 },   // ramp up to 100 users
        { duration: '1m', target: 0 },     // scale down to 0 users
    ],
};

export default function () {
    const response = http.get('http://192.168.49.2:30002/jobRead');

    check(response, {
        'status is 200': (r) => r.status === 200,
        'response time < 500ms': (r) => r.timings.duration < 500,
    });

    sleep(1); // pause between requests to simulate user think time
}
