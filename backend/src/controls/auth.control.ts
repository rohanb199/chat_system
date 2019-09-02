import {NextFunction, Request, Response} from 'express';
import {SignIn, SignUp, User} from "../models/user";
import {connect} from "../db";
import {normalizeResult, tokenGenerator} from "./extra.control";

let authentications: User[] = [];

export async function checkAuth(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;
    if (authToken && authentications.length > 0) {
        next();
    } else {
        return res.status(401).json({
            status: {
                code: 'NOT_AUTHENTICATED',
                message: 'No token in the header of the request'
            }
        })
    }
}

export async function getAuth(req: Request, res: Response) {
    const authToken = req.headers.authorization;
    if (authToken && authentications.length > 0) {
        const date: number = new Date().valueOf();
        const lastLogIn: number = authentications.filter((x: User) => x.authToken === authToken)[0].expirationSessionTime;
        if (date - lastLogIn <= 3.6e+6) {
            const authIndex = authentications.findIndex((u: User) => u.authToken === authToken);
            authentications[authIndex].expirationSessionTime = date;
            return res.status(200).json({
                status: {
                    code: 'STATUS_OK',
                },
                body: {
                    data: authentications[authIndex]
                }
            })
        } else {
            return res.status(401).json({
                status: {
                    code: 'NOT_AUTHENTICATED',
                    message: 'Your token is expired, sign in again'
                }
            })
        }
    } else {
        return res.status(401).json({
            status: {
                code: 'NOT_AUTHENTICATED',
                message: 'No token in the header of the request'
            }
        })
    }
}

export async function setAuth(req: Request, res: Response) {
    const user: SignIn = req.body;
    const connection = await connect();
    const result: any = await connection.query(
        'SELECT * FROM `user` WHERE password = ? AND (username = ? || email = ?)',
        [user.password, user.username, user.email]
    );
    await connection.end();
    const normalizedResult: any = normalizeResult(result[0]);
    const newExpirationSessionTime: number = new Date().valueOf();
    const newAuthToken: string = tokenGenerator(15);
    if (Object.keys(normalizedResult).length > 0) {
        const newAuth: User = {
            id: normalizedResult.id,
            firstName: normalizedResult.firstName,
            lastName: normalizedResult.lastName,
            username: normalizedResult.username,
            email: normalizedResult.email,
            birthdate: normalizedResult.birthdate,
            qualification: normalizedResult.qualification,
            avatarSrc: normalizedResult.avatarSrc,
            authToken: newAuthToken,
            expirationSessionTime: newExpirationSessionTime
        };
        authentications.push(newAuth);
        return res.status(200).json({
            status: {
                code: 'STATUS_OK',
                message: 'Sign in successfully'
            },
            body: {
                data: newAuth
            }
        });
    } else {
        return res.status(401).json({
            status: {
                code: 'NOT_AUTHENTICATED',
                message: 'Wrong username or password'
            }
        })
    }
}

export async function createAuth(req: Request, res: Response) {
    const user: SignUp = req.body;
    console.log(user);
    const connection = await connect();
    const result = await connection.query(
        'INSERT INTO `user`(`firstName`,`lastName`,`username`,`email`,`password`) VALUES(?,?,?,?,?)',
        [user.firstName, user.lastName, user.username, user.email, user.password]
    ).catch((error: any) => console.log(error));
    const normalizedResult: any = normalizeResult(result);
    await connection.end();
    if (normalizedResult.affectedRows === 1) {
        return res.status(201).json({
            status: {
                code: 'STATUS_OK',
                message: `${user.username} created successfully`
            }
        });
    }
}

export async function destroyAuth(req: Request, res: Response) {
    const authToken = req.headers.authorization;
    const authIndex = authentications.findIndex((i: any) => i.authToken === authToken);
    authentications.splice(authIndex, 1);
    return res.status(200).json({
        status: {
            code: 'STATUS_OK',
            message: 'Logged out successfully'
        }
    })
}
