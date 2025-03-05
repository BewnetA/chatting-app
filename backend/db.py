import asyncpg
import os

async def get_db_pool():
    return await asyncpg.create_pool(
        host=os.getenv("DB_HOST"),
        database=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        port=os.getenv("DB_PORT"),
        min_size=1,  # Minimum connections in the pool
        max_size=5 
    )

async def create_db():
    pool = await get_db_pool()
    try:
        async with pool.acquire() as connection:
            # Create users table
            await connection.execute("""
                CREATE TABLE IF NOT EXISTS users (
                    user_id BIGINT PRIMARY KEY,
                    username VARCHAR(255),
                    first_name VARCHAR(255),
                    job_titles TEXT,
                    job_types VARCHAR(255)
                );
            """)
           
    except Exception as err:
        print(f"Error creating tables: {err}")
    finally:
        await pool.close()  # Make sure to close the pool after use

async def add_user(user_id: int, username: str, first_name: str, titles: str, types: str):
    pool = await get_db_pool()
    try:
        async with pool.acquire() as connection:
            # Insert a new user into the users table
            await connection.execute("""
                INSERT INTO users (user_id, username, first_name, job_titles, job_types)
                VALUES ($1, $2, $3, $4, $5)
            """, user_id, username, first_name, titles, types)
            print(f"User {username} added successfully.")
    except Exception as err:
        print(f"Error adding user: {err}")
    finally:
        await pool.close()  # Close the pool after the operation

# Function to insert dummy data into the database for testing
async def insert_dummy_data():
    await add_user(1, "john_doe", "John", "Developer, AI", "remote")
    await add_user(2, "jane_smith", "Jane", "Accountant, sales", "remote")
    await add_user(3, "alice_jones", "Alice", "Security", "on-site")