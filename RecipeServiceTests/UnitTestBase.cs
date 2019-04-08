using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeServiceTests
{
    public class UnitTestBase
    {
        public MockRepository MockRepository { get; private set; }

        [SetUp]
        public void UnitTestBaseSetUp()
        {
            MockRepository = new MockRepository(MockBehavior.Default);
        }

        [TearDown]
        public void VerifyAndTearDown()
        {
            //MockRepository.VerifyAll();
        }
    }
}
