
export async function GET(){

    try{
        // Get user from auth
        const user = await auth.getUser();
        
        if (!user) {
            return new Response(JSON.stringify({ error: 'User not authenticated' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
    }

        return new Response(JSON.stringify({ name: user.name }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }catch(er){
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
}}
