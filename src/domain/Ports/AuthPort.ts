interface IProps {
    id?: string,
    login?: string,
    password?: string 
}

interface IPort {
    signIn: (id: string) => Promise<IProps | null | Error>;
    signUp: (login: string, password: string) => Promise<IProps | null | Error>;
    signOut: () => {};
}

abstract class Port implements IPort {
    
    signIn = async (login: string): Promise<IProps | null | Error> => {
        throw new Error("Method not implemented.");
    }

    signUp = async (login: string, password: string): Promise<IProps | null | Error> => {
        throw new Error("Method not implemented.");
    }

    signOut = async (): Promise<string> => {
        throw new Error("Method not implemented.");
    }

}

export { Port as AuthPort };
